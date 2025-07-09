import json
from typing import Dict, Any, List
import requests

# === Gemini Chatbot API Configuration ===
GEMINI_API_KEY = "AIzaSyD1sha-zanu6kQRbTqF9TrQS5IKSy1aLtk"  # Replace with your own key
GEMINI_MODEL = "models/gemini-2.0-flash"
GEMINI_API_URL = f"https://generativelanguage.googleapis.com/v1beta/{GEMINI_MODEL}:generateContent?key={GEMINI_API_KEY}"

def ask_gemini(query: str) -> Dict[str, str]:
    headers = {
        "Content-Type": "application/json"
    }

    prompt = (
        "You are a sustainability expert. "
        "Answer the following question in 3–5 concise sentences. "
        "Be clear, direct, and avoid long explanations:\n\n"
        f"{query}"
    )

    payload = {
        "contents": [
            {
                "parts": [
                    {"text": prompt}
                ]
            }
        ]
    }

    try:
        response = requests.post(GEMINI_API_URL, headers=headers, json=payload)
        result = response.json()

        if "candidates" in result:
            answer = result["candidates"][0]["content"]["parts"][0]["text"]
            return {"answer": answer.strip()}
        else:
            return {"error": result.get("error", "No answer returned.")}
    except Exception as e:
        return {"error": str(e)}

# ClimateIQ API key
CLIMATEIQ_API_KEY = "JGZK133XFH737DDN3ZM34FCCRC"

# Sample emission factors (expand as needed)
EMISSION_FACTORS = {
    "UK": {
        "electricity": 0.233,  # kg CO2/kWh
        "gas": 0.184,          # kg CO2/kWh
        "oil": 2.52,           # kg CO2/litre
        "diesel": 2.68,        # kg CO2/litre
        "petrol": 2.31,        # kg CO2/litre
        "short_haul_flight": 0.15,  # kg CO2/km
        "long_haul_flight": 0.11,   # kg CO2/km
        "food": 1.7,           # kg CO2/person/day (average)
        "waste": 0.45,         # kg CO2/person/day (average)
        "public_transport": 0.05 # kg CO2/km
    },
    "Germany": {
        "electricity": 0.401,
        "gas": 0.201,
        "oil": 2.52,
        "diesel": 2.65,
        "petrol": 2.30,
        "short_haul_flight": 0.16,
        "long_haul_flight": 0.12,
        "food": 1.8,
        "waste": 0.5,
        "public_transport": 0.06
    },
    "India": {
        "electricity": 0.708,  # kg CO2/kWh (India grid average, 2022)
        "gas": 0.202,          # kg CO2/kWh (similar to global)
        "oil": 2.52,           # kg CO2/litre
        "diesel": 2.68,        # kg CO2/litre
        "petrol": 2.31,        # kg CO2/litre
        "short_haul_flight": 0.15,  # kg CO2/km
        "long_haul_flight": 0.11,   # kg CO2/km
        "food": 1.5,           # kg CO2/person/day (lower than UK/DE due to diet)
        "waste": 0.35,         # kg CO2/person/day (lower than UK/DE)
        "public_transport": 0.04 # kg CO2/km (efficient public transport)
    },
    "Global": {
        "electricity": 0.475,
        "gas": 0.202,
        "oil": 2.52,
        "diesel": 2.68,
        "petrol": 2.31,
        "short_haul_flight": 0.15,
        "long_haul_flight": 0.11,
        "food": 1.7,
        "waste": 0.45,
        "public_transport": 0.05
    }
}

# Average flight distances (km)
FLIGHT_DISTANCES = {
    "short_haul": 1100,
    "long_haul": 6500
}

def get_emission_factor_from_api(country: str, category: str, subcategory: str = "") -> float:
    """
    Fetch emission factor from ClimateIQ API. Returns 0.0 if not found or on error.
    """
    url = "https://api.climateiq.com/v1/emission-factors"
    params = {"country": country, "category": category}
    if subcategory:
        params["subcategory"] = subcategory
    headers = {"Authorization": f"Bearer {CLIMATEIQ_API_KEY}"}
    try:
        response = requests.get(url, params=params, headers=headers, timeout=5)
        if response.status_code == 200:
            data = response.json()
            # Assume the API returns a list of factors, pick the first
            if isinstance(data, list) and data:
                return float(data[0].get("emission_factor", 0.0))
            elif isinstance(data, dict) and "emission_factor" in data:
                return float(data["emission_factor"])
    except Exception:
        pass
    return 0.0

def get_factors(country: str) -> Dict[str, float]:
    return EMISSION_FACTORS.get(country, EMISSION_FACTORS["Global"])

def get_dynamic_factor(country: str, category: str, fallback: float, subcategory: str = "") -> float:
    api_factor = get_emission_factor_from_api(country, category, subcategory)
    return api_factor if api_factor > 0 else fallback

def calculate_home_energy(home_energy: Dict[str, float], factors: Dict[str, float], country: str) -> float:
    total = 0.0
    if "electricity_kwh" in home_energy:
        factor = get_dynamic_factor(country, "electricity", factors["electricity"])
        total += home_energy["electricity_kwh"] * factor
    if "gas_kwh" in home_energy:
        factor = get_dynamic_factor(country, "gas", factors["gas"])
        total += home_energy["gas_kwh"] * factor
    if "oil_litres" in home_energy:
        factor = get_dynamic_factor(country, "oil", factors["oil"])
        total += home_energy["oil_litres"] * factor
    return total

def calculate_vehicles(vehicles: List[Dict[str, Any]], factors: Dict[str, float], country: str) -> float:
    total = 0.0
    for v in vehicles:
        if v["fuel"] in ["diesel", "petrol"]:
            annual_km = v.get("annual_km", 0)
            l_per_100km = v.get("l_per_100km", 0)
            litres = (annual_km / 100) * l_per_100km
            factor = get_dynamic_factor(country, v["fuel"], factors[v["fuel"]])
            total += litres * factor
    return total

def calculate_flights(flights: List[Dict[str, Any]], factors: Dict[str, float], country: str) -> float:
    total = 0.0
    for f in flights:
        flight_type = f["type"]
        count = f["count"]
        distance = FLIGHT_DISTANCES.get(flight_type, 0)
        factor_key = f"{flight_type}_flight"
        factor = get_dynamic_factor(country, "flight", factors.get(factor_key, 0), subcategory=flight_type)
        total += count * distance * factor
    return total

def calculate_food(food: Dict[str, Any], factors: Dict[str, float], household_size: int, country: str) -> float:
    days = food.get("days", 365)
    factor = get_dynamic_factor(country, "food", factors["food"])
    return days * household_size * factor

def calculate_waste(waste: Dict[str, Any], factors: Dict[str, float], household_size: int, country: str) -> float:
    days = waste.get("days", 365)
    factor = get_dynamic_factor(country, "waste", factors["waste"])
    return days * household_size * factor

def calculate_public_transport(public_transport: List[Dict[str, Any]], factors: Dict[str, float], country: str) -> float:
    total = 0.0
    for t in public_transport:
        km = t.get("annual_km", 0)
        factor = get_dynamic_factor(country, "public_transport", factors["public_transport"])
        total += km * factor
    return total

def calculate_carbon_footprint(input_data: Dict[str, Any]) -> Dict[str, Any]:
    country = input_data.get("country", "Global")
    category = input_data.get("category", "person")
    household_size = input_data.get("household_size", 1)
    factors = get_factors(country)

    home_energy_kg = calculate_home_energy(input_data.get("home_energy", {}), factors, country)
    vehicles_kg = calculate_vehicles(input_data.get("vehicles", []), factors, country)
    flights_kg = calculate_flights(input_data.get("flights", []), factors, country)
    food_kg = calculate_food(input_data.get("food", {}), factors, household_size, country)
    waste_kg = calculate_waste(input_data.get("waste", {}), factors, household_size, country)
    public_transport_kg = calculate_public_transport(input_data.get("public_transport", []), factors, country)

    total_kg = home_energy_kg + vehicles_kg + flights_kg + food_kg + waste_kg + public_transport_kg
    per_person_kg = total_kg / household_size if household_size > 0 else total_kg

    return {
        "total_footprint_kg": round(total_kg, 2),
        "per_person_kg": round(per_person_kg, 2),
        "breakdown": {
            "home_energy_kg": round(home_energy_kg, 2),
            "vehicles_kg": round(vehicles_kg, 2),
            "flights_kg": round(flights_kg, 2),
            "food_kg": round(food_kg, 2),
            "waste_kg": round(waste_kg, 2),
            "public_transport_kg": round(public_transport_kg, 2)
        }
    }

# Example usage:
if __name__ == "__main__":
    def get_float(prompt, default=0.0):
        while True:
            try:
                val = input(prompt)
                if val == '':
                    return default
                fval = float(val)
                if fval < 0:
                    print("  Value cannot be negative. Please enter a non-negative number.")
                    continue
                return fval
            except Exception:
                print("  Invalid input. Please enter a number.")

    def get_int(prompt, default=0):
        while True:
            try:
                val = input(prompt)
                if val == '':
                    return default
                ival = int(val)
                if ival < 0:
                    print("  Value cannot be negative. Please enter a non-negative integer.")
                    continue
                return ival
            except Exception:
                print("  Invalid input. Please enter an integer.")

    print("--- Carbon Footprint Calculator ---")
    country = input("Country (e.g., UK, Germany, India): ").strip() or "Global"
    category = input("Category (person/family): ").strip().lower() or "person"
    household_size = get_int("Household size (number of people): ", 1)
    if household_size < 1:
        print("  Household size must be at least 1. Defaulting to 1.")
        household_size = 1

    print("\n--- Home Energy ---")
    electricity_kwh = get_float("Annual electricity use (kWh): ", 0)
    gas_kwh = get_float("Annual gas use (kWh): ", 0)
    oil_litres = get_float("Annual oil use (litres): ", 0)
    home_energy = {
        "electricity_kwh": electricity_kwh,
        "gas_kwh": gas_kwh,
        "oil_litres": oil_litres
    }

    print("\n--- Vehicles ---")
    vehicles = []
    while True:
        add_vehicle = input("Add a vehicle? (y/n): ").strip().lower()
        if add_vehicle != 'y':
            break
        fuel = input("  Fuel type (petrol/diesel): ").strip().lower()
        if fuel not in ["petrol", "diesel"]:
            print("  Invalid fuel type. Please enter 'petrol' or 'diesel'.")
            continue
        annual_km = get_float("  Annual distance (km): ", 0)
        l_per_100km = get_float("  Fuel consumption (litres/100km): ", 0)
        vehicles.append({
            "type": "car",
            "fuel": fuel,
            "annual_km": annual_km,
            "l_per_100km": l_per_100km
        })

    print("\n--- Flights ---")
    flights = []
    for flight_type in ["short_haul", "long_haul"]:
        count = get_int(f"Number of {flight_type.replace('_', ' ')} flights per year: ", 0)
        if count > 0:
            flights.append({"type": flight_type, "count": count})

    print("\n--- Food ---")
    food_days = get_int("Number of days to include for food (default 365): ", 365)
    if food_days < 1:
        print("  Number of days must be at least 1. Defaulting to 365.")
        food_days = 365
    food = {"days": food_days}

    print("\n--- Waste ---")
    waste_days = get_int("Number of days to include for waste (default 365): ", 365)
    if waste_days < 1:
        print("  Number of days must be at least 1. Defaulting to 365.")
        waste_days = 365
    waste = {"days": waste_days}

    print("\n--- Public Transport ---")
    public_transport = []
    while True:
        add_pt = input("Add public transport usage? (y/n): ").strip().lower()
        if add_pt != 'y':
            break
        annual_km = get_float("  Annual distance (km): ", 0)
        public_transport.append({"annual_km": annual_km})

    user_input = {
        "country": country,
        "category": category,
        "household_size": household_size,
        "home_energy": home_energy,
        "vehicles": vehicles,
        "flights": flights,
        "food": food,
        "waste": waste,
        "public_transport": public_transport
    }

    print("\nCalculating your carbon footprint...\n")
    try:
        result = calculate_carbon_footprint(user_input)
        print(json.dumps(result, indent=2))
        print(f"\nYour total annual carbon footprint is: {result['total_footprint_kg']:,} kg CO₂")
        print(f"(per person: {result['per_person_kg']:,} kg CO₂)")
    except Exception as e:
        print(f"An error occurred during calculation: {e}")

    # --- More Options ---
    more_options = input("\nWould you like to enter more details (e.g., motorcycles, electric cars, appliances, electronics, business travel)? (y/n): ").strip().lower()
    if more_options == 'y':
        # Motorcycles
        motorcycles = []
        while True:
            add_mc = input("Add a motorcycle? (y/n): ").strip().lower()
            if add_mc != 'y':
                break
            annual_km = get_float("  Annual distance (km): ", 0)
            l_per_100km = get_float("  Fuel consumption (litres/100km): ", 0)
            motorcycles.append({
                "annual_km": annual_km,
                "l_per_100km": l_per_100km
            })
        # Electric Cars
        electric_cars = []
        while True:
            add_ec = input("Add an electric car? (y/n): ").strip().lower()
            if add_ec != 'y':
                break
            annual_km = get_float("  Annual distance (km): ", 0)
            kwh_per_100km = get_float("  Electricity consumption (kWh/100km): ", 0)
            electric_cars.append({
                "annual_km": annual_km,
                "kwh_per_100km": kwh_per_100km
            })
        # Household Appliances
        appliances = []
        while True:
            add_ap = input("Add a household appliance? (y/n): ").strip().lower()
            if add_ap != 'y':
                break
            name = input("  Appliance name: ").strip()
            annual_kwh = get_float("  Annual electricity use (kWh): ", 0)
            appliances.append({"name": name, "annual_kwh": annual_kwh})
        # Electronics
        electronics = []
        while True:
            add_el = input("Add an electronic device? (y/n): ").strip().lower()
            if add_el != 'y':
                break
            name = input("  Device name: ").strip()
            annual_kwh = get_float("  Annual electricity use (kWh): ", 0)
            electronics.append({"name": name, "annual_kwh": annual_kwh})
        # Business Travel
        business_travel_km = get_float("Annual business travel distance (km, by air): ", 0)

        # Calculate additional emissions
        country = user_input["country"]
        factors = get_factors(country)
        # Motorcycles (assume 2.1 kg CO2/litre, global average)
        motorcycles_kg = 0.0
        for m in motorcycles:
            litres = (m["annual_km"] / 100) * m["l_per_100km"]
            motorcycles_kg += litres * 2.1
        # Electric cars (use country electricity factor)
        electric_cars_kg = 0.0
        for e in electric_cars:
            kwh = (e["annual_km"] / 100) * e["kwh_per_100km"]
            electric_cars_kg += kwh * factors["electricity"]
        # Appliances
        appliances_kg = sum(a["annual_kwh"] * factors["electricity"] for a in appliances)
        # Electronics
        electronics_kg = sum(e["annual_kwh"] * factors["electricity"] for e in electronics)
        # Business travel (assume long-haul flight factor)
        business_travel_kg = business_travel_km * factors.get("long_haul_flight", 0.11)

        # Add to previous result
        total_kg = result["total_footprint_kg"] + motorcycles_kg + electric_cars_kg + appliances_kg + electronics_kg + business_travel_kg
        per_person_kg = total_kg / user_input["household_size"] if user_input["household_size"] > 0 else total_kg
        breakdown = result["breakdown"].copy()
        breakdown["motorcycles_kg"] = round(motorcycles_kg, 2)
        breakdown["electric_cars_kg"] = round(electric_cars_kg, 2)
        breakdown["appliances_kg"] = round(appliances_kg, 2)
        breakdown["electronics_kg"] = round(electronics_kg, 2)
        breakdown["business_travel_kg"] = round(business_travel_kg, 2)
        print("\n--- Updated Carbon Footprint with More Details ---")
        print(json.dumps({
            "total_footprint_kg": round(total_kg, 2),
            "per_person_kg": round(per_person_kg, 2),
            "breakdown": breakdown
        }, indent=2))
        print(f"\nYour updated total annual carbon footprint is: {total_kg:,} kg CO₂")
        print(f"(per person: {per_person_kg:,} kg CO₂)")
    else:
        print("\nThank you for using the Carbon Footprint Calculator!")

    # Keep the previous sample for reference
    # sample_input = {
    #     "country": "Germany",
    #     "category": "family",
    #     "household_size": 4,
    #     "home_energy": {
    #         "electricity_kwh": 5000,
    #         "gas_kwh": 8000,
    #         "oil_litres": 0
    #     },
    #     "vehicles": [
    #         {"type": "car", "fuel": "diesel", "annual_km": 12000, "l_per_100km": 5.5}
    #     ],
    #     "flights": [
    #         {"type": "short_haul", "count": 2},
    #         {"type": "long_haul", "count": 1}
    #     ],
    #     "food": {},
    #     "waste": {},
    #     "public_transport": [
    #         {"annual_km": 2000}
    #     ]
    # }
    # result = calculate_carbon_footprint(sample_input)
    # print(json.dumps(result, indent=2)) 