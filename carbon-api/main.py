from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from carbon_calculator import calculate_carbon_footprint

app = FastAPI()

# Allow frontend to access API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or "http://localhost:3000" if you want to restrict
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.post("/api/calculate")
async def calculate(request: Request):
    data = await request.json()
    print("Received data:", data)  # ✅ Log incoming request
    result = calculate_carbon_footprint(data)
    return result



