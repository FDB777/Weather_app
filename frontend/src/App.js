// App.js
// Main (and only) component for our weather app.
// Handles: taking user input, calling OUR backend, showing results/errors.

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

// This points to our own Node backend, NOT OpenWeatherMap directly.
// When you deploy later, you'll change this to your live backend URL.
const BACKEND_URL = 'https://weather-app-z3xi.onrender.com';

function App() {
  const [city, setCity] = useState('');       // what the user is typing
  const [weather, setWeather] = useState(null); // weather data once fetched
  const [error, setError] = useState('');      // error message, if any
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    // Don't search if the input is empty
    if (!city.trim()) return;

    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const response = await axios.get(`${BACKEND_URL}/weather/${city}`);
      setWeather(response.data);
    } catch (err) {
      // err.response.data.error comes from our backend's error messages
      const message =
        err.response?.data?.error || 'Could not fetch weather. Try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Let users press Enter instead of only clicking the button
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="app">
      <div className="card">
        <h1>Weather App</h1>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {loading && <p className="status">Loading...</p>}
        {error && <p className="status error">{error}</p>}

        {weather && (
          <div className="weather-result">
            <h2>
              {weather.city}, {weather.country}
            </h2>

            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.description}
            />

            <p className="temperature">{Math.round(weather.temperature)}°C</p>
            <p className="description">{weather.description}</p>

            <div className="details">
              <p>Feels like: {Math.round(weather.feelsLike)}°C</p>
              <p>Humidity: {weather.humidity}%</p>
              <p>Wind: {weather.windSpeed} m/s</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
