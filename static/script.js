document.getElementById('predict-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const resultEl = document.getElementById('result');
  const priceEl = document.getElementById('price-value');
  const errorEl = document.getElementById('error');

  resultEl.classList.add('hidden');
  errorEl.classList.add('hidden');

  const payload = {
    SPX: parseFloat(document.getElementById('spx').value),
    USO: parseFloat(document.getElementById('uso').value),
    SLV: parseFloat(document.getElementById('slv').value),
    EUR_USD: parseFloat(document.getElementById('eurusd').value),
  };

  try {
    const response = await fetch('/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.success) {
      priceEl.textContent = '$' + data.predicted_gold_price.toFixed(2);
      resultEl.classList.remove('hidden');
    } else {
      errorEl.textContent = 'Prediction failed: ' + data.error;
      errorEl.classList.remove('hidden');
    }
  } catch (err) {
    errorEl.textContent = 'Could not connect to the API. Make sure the server is running.';
    errorEl.classList.remove('hidden');
  }
});
