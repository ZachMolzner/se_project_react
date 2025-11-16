🧥 WTWR – What To Wear Right Now

A weather-based clothing recommendation app built with React + Vite.

WTWR shows the current weather for the user’s location and recommends clothing items based on temperature. Users can add their own clothing items, preview them in a modal, and browse items filtered by weather type (hot, warm, cold). The app dynamically updates between day/night themes, uses live weather API data, and is fully responsive across desktop, tablet, and mobile.

⭐ Features
🌤 Real-time Weather Display

Fetches real weather data from an API.

Detects temperature, weather condition, city, and day/night.

Parses weather into "hot", "warm", or "cold" categories.

👕 Clothing Recommendations

Shows matching clothing items based on weather type.

Items can be previewed in a modal with a full-size image.

➕ Add New Garments

Users can add new clothing items via a form modal.

New items appear instantly in the clothing grid.

🌓 Day/Night Themes

UI updates based on sunrise/sunset times.

📱 Fully Responsive

Custom layouts for desktop, tablet, and mobile.

Hamburger menu + mobile header card for small screens.

🔒 Clean Architecture

Component-based structure (Header, Main, Footer, Modals, Cards).

Weather API helpers: getCurrentWeather, parseWeatherData, getWeatherCondition.

🚀 Live Demo (if deployed)

Replace this link with your GitHub Pages / Netlify deployment
https://your-username.github.io/wtwr/

🛠 Technologies Used
Frontend

React

Vite

JavaScript (ES6+)

CSS (BEM methodology)

Responsive design / media queries

Tools & Libraries

React Hooks (useState, useEffect)

Git & GitHub

GitHub Pages (optional deployment)

Fetch API

APIs

Custom weather API utilities

OpenWeatherMap (or your chosen weather API source)
