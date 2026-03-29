# Gold Price Prediction API

A REST API built with FastAPI that predicts gold (GLD ETF) prices using a Random Forest Regressor trained on historical financial market data from 2008 to 2018.

## Dataset

The model is trained on `gld_price_data.csv` which contains 2290 daily records with the following columns:

| Column  | Description                  |
|---------|------------------------------|
| Date    | Trading date                 |
| SPX     | S&P 500 Index price          |
| GLD     | Gold ETF price (target)      |
| USO     | Oil ETF price                |
| SLV     | Silver ETF price             |
| EUR/USD | Euro to US Dollar exchange rate |

## Model

- Algorithm: Random Forest Regressor (scikit-learn)
- Features: SPX, USO, SLV, EUR/USD
- Target: GLD (Gold ETF price)

## Project Structure

```
├── app.py                        # FastAPI application
├── Gold_price_prediction.ipynb   # Model training notebook
├── model.pkl                     # Trained model (generated from notebook)
├── gld_price_data.csv            # Dataset (required to retrain)
├── requirements.txt              # Python dependencies
└── README.md
```

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/gold-price-prediction-api.git
   cd gold-price-prediction-api
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate      # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. (Optional) Retrain the model by running all cells in `Gold_price_prediction.ipynb`. This will regenerate `model.pkl`.

## Running the API

```bash
uvicorn app:app --reload
```

The API will be available at `http://127.0.0.1:8000`

## API Endpoints

### GET /
Health check endpoint.

**Response:**
```json
{
  "message": "Gold Price Prediction API is running"
}
```

### POST /predict
Predicts the gold (GLD) price based on financial market indicators.

**Request Body:**
```json
{
  "SPX": 2700.5,
  "USO": 14.2,
  "SLV": 15.8,
  "EUR_USD": 1.19
}
```

| Field   | Type  | Description                        |
|---------|-------|------------------------------------|
| SPX     | float | S&P 500 Index value                |
| USO     | float | Oil ETF price                      |
| SLV     | float | Silver ETF price                   |
| EUR_USD | float | EUR/USD exchange rate              |

**Response:**
```json
{
  "success": true,
  "predicted_gold_price": 124.85
}
```

## Interactive Docs

FastAPI provides built-in interactive documentation:

- Swagger UI: `http://127.0.0.1:8000/docs`
- ReDoc: `http://127.0.0.1:8000/redoc`

## License

This project is open-source and available under the [MIT License](LICENSE).
