import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/directions', async (req, res) => {
  const { origin, destination, mode, key } = req.query;
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=${mode}&key=${key}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch directions' });
  }
});

app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
