from fastapi import FastAPI

app = FastAPI(
    title="KRISHI-SHIELD AI",
    description="AI-Powered Crop Crisis Investigation Platform",
    version="1.0.0",
)

@app.get("/")
def home():
    return {
        "message": "Welcome to KRISHI-SHIELD AI",
        "status": "running"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "krishi-shield-backend"
    }

@app.get("/api/v1")
def api_information():
    return {
        "project": "KRISHI-SHIELD AI",
        "version": "1.0.0"
    }
