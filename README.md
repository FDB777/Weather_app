# Weather App (React + Node.js)

A simple full-stack weather app. You search a city, the React frontend asks
our Node backend, and the backend fetches real data from OpenWeatherMap.

## Project structure
```
weather-app/
├── backend/
│   ├── server.js
│   ├── .env.example   <- copy this to .env and add your real key
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
└── .gitignore
```

## Setup steps

### 1. Get a free API key
Sign up at https://openweathermap.org/api and grab your free API key.
(New keys can take a few minutes to a couple hours to activate — don't panic
if you get an error immediately after signing up.)

### 2. Set up the backend
```bash
cd backend
npm install
cp .env.example .env
```
Now open `.env` and paste your real key:
```
WEATHER_API_KEY=your_actual_key_here
```
Start the backend:
```bash
npm start
```
You should see: `Weather backend running at http://localhost:5000`
Visit http://localhost:5000 in your browser — it should say the backend is running.

### 3. Set up the frontend
Open a **new** terminal tab/window (keep the backend running):
```bash
cd frontend
npm install
npm start
```
This opens http://localhost:3000 automatically — type a city and hit Search.

## How it works
1. You type a city and click Search (or press Enter).
2. React calls our own backend: `http://localhost:5000/weather/<city>`.
3. The backend calls OpenWeatherMap using the secret key from `.env`.
4. The backend sends back only the fields we need (temp, description, etc.).
5. React displays it in a card.

## Before pushing to GitHub
- `.env` is already listed in `.gitignore` — double check it's NOT staged
  before you commit (`git status` should not show it).
- `node_modules/` folders are also ignored — anyone cloning your repo just
  runs `npm install` in both folders to get them back.

## Deploying later
- Backend: host on Render or Railway (free tier). Add `WEATHER_API_KEY` as
  an environment variable in their dashboard — don't upload `.env`.
- Frontend: host on Vercel or Netlify. Update `BACKEND_URL` in `App.js` to
  point to your live backend URL instead of `localhost:5000`.
