from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from carbon_calculator import calculate_carbon_footprint, ask_gemini

app = FastAPI()

# Allow frontend to access API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or restrict to: ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Existing Carbon Footprint Endpoint ===
@app.post("/api/calculate")
async def calculate(request: Request):
    data = await request.json()
    print("Received data:", data)
    result = calculate_carbon_footprint(data)
    return result

# === New Chatbot Endpoint ===
@app.post("/chatbot")
async def chatbot(req: Request):
    data = await req.json()
    question = data.get("question", "")
    
    if not question:
        return {"error": "Question is required"}

    return ask_gemini(question)
