🧥 WTWR – What To Wear Right Now

A responsive, weather-based clothing recommendation app built with React + Vite.
WTWR displays the user’s local weather conditions and recommends appropriate clothing items based on temperature. Users can add their own items, preview them in a modal, and browse items filtered by weather type (“hot,” “warm,” or “cold”).
The interface updates dynamically between day and night and adapts smoothly across desktop, tablet, and mobile layouts.

⭐ Features
🌤 Real-Time Weather Display

Fetches live data from a weather API

Detects temperature, weather condition, city, and day/night cycle

Parses raw weather into simplified categories: hot, warm, cold

👕 Dynamic Clothing Recommendations

Displays user-added clothing that matches the weather

Items open in a full-size modal preview

Clothing grid is organized by type for easy browsing

➕ Add New Garments

Modal form allows users to upload and name clothing items

Items render instantly on the main grid

🌓 Automatic Day/Night Theme

UI theme adjusts based on sunrise and sunset

Weather card, header, and background adapt to time of day

📱 Fully Responsive UI

Custom layouts for desktop, tablet, and mobile

Includes hamburger menu + compact mobile header card

Scales smoothly down to 375px mobile width

🔒 Clean, Scalable Architecture

Modular React components (Header, Main, Footer, Cards, Modals)

Weather utility functions:

getCurrentWeather

parseWeatherData

getWeatherCondition

CSS organized using BEM methodology

🚀 Live Demo

(Replace this with your deployed link once ready)

GitHub Repository:
https://github.com/ZachMolzner/se_project_react.git

🛠 Technologies Used
Frontend

React

Vite

JavaScript (ES6+)

CSS (BEM)

Responsive Media Queries

Tools & Libraries

React Hooks (useState, useEffect)

Git & GitHub

GitHub Pages (optional deployment)

Fetch API

APIs

Custom weather utility functions

OpenWeatherMap (or chosen weather provider)

🧪 Installation & Setup

1. Clone the repository
   git clone https://github.com/ZachMolzner/se_project_react.git
   cd se_project_react

2. Install dependencies
   npm install

3. Run the development server
   npm run dev

4. Build for production
   npm run build

🔧 Environment Variables (Weather API)

Create a .env file:

VITE_WEATHER_API_KEY=your_api_key_here
VITE_WEATHER_BASE_URL=https://api.openweathermap.org/data/2.5/

📌 Future Improvements

User authentication

“Favorite” clothing items

Edit/delete clothing items

Multi-language support

Dark mode override setting

👤 Author

Zach Molzner
Software Engineer Trainee – TripleTen
GitHub: https://github.com/ZachMolzner
Video Demo - https://youtu.be/pGzW_MDcuLc
