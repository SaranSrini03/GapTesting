const express = require('express');
const yahooFinance = require('yahoo-finance2').default;
const app = express();
const port = 5000;

app.get('/api/stock-data', async (req, res) => {
  const { ticker, startDate, endDate } = req.query;

  if (!ticker || !startDate || !endDate) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }

  try {
    const data = await yahooFinance.history(ticker, {
      period1: new Date(startDate).toISOString(),
      period2: new Date(endDate).toISOString()
    });

    res.json(data);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    res.status(500).json({ error: 'Error fetching stock data' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
