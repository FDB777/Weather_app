// server.js
// This is our backend server. Its only job is to:
// 1. Receive a city name from the React frontend
// 2. Call OpenWeatherMap using our SECRET API key (hidden here, never in React)
// 3. Send the weather data back to the frontend

require('dotenv').config(); // loads variables from .env into process.env

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 5000;

// Allow our React app (running on a different port) to talk to this server
app.use(cors());

// Read the secret key from .env — this line NEVER hardcodes the key in code
const API_KEY = process.env.WEATHER_API_KEY;

// A simple "health check" route — visiting this in browser confirms server is alive
app.get('/', (req, res) => {
  res.send('Weather backend is running!');
});

// Main route: GET /weather/london  or  GET /weather/new york
app.get('/weather/:city', async (req, res) => {
  const city = req.params.city;

  try {
    // Ask OpenWeatherMap for the current weather of this city
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric' // gives us Celsius instead of Kelvin
        }
      }
    );

    const data = response.data;

    // We only send back the fields the frontend actually needs
    res.json({
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed
    });

  } catch (error) {
    // Most common case: city name typed wrong / doesn't exist
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: 'City not found. Check the spelling and try again.' });
    } else {
      console.error(error.message);
      res.status(500).json({ error: 'Something went wrong fetching the weather.' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Weather backend running at http://localhost:${PORT}`);
});
