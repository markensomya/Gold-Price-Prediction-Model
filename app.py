from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
import numpy as np
import joblib

app = FastAPI(title="Gold Price Prediction API")

# Mount static files and templates
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# Load model
model = joblib.load("model.pkl")

# Input schema
class GoldInput(BaseModel):
    SPX: float      # S&P 500 Index
    USO: float      # Oil ETF price
    SLV: float      # Silver ETF price
    EUR_USD: float  # EUR/USD exchange rate

# Serve frontend
@app.get("/")
async def home(request: Request):
    return templates.TemplateResponse(request, "index.html")

# Prediction endpoint
@app.post("/predict")
def predict(data: GoldInput):
    try:
        features = np.array([
            data.SPX,
            data.USO,
            data.SLV,
            data.EUR_USD
        ]).reshape(1, -1)

        prediction = model.predict(features)

        return {
            "success": True,
            "predicted_gold_price": float(prediction[0])
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }
