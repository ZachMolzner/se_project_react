# 🧥 WTWR – What To Wear Right Now

A responsive, weather-based clothing recommendation app built with **React + Vite**.

WTWR displays the user’s local weather conditions and recommends appropriate clothing items based on temperature. Users can register, log in, add their own clothing items, like items, preview them in a modal, and browse clothing filtered by weather type (“hot,” “warm,” or “cold”).

The interface dynamically adapts between day and night and is fully responsive across desktop, tablet, and mobile devices.

---

## ⭐ Features

### 🌤 Real-Time Weather Display

- Fetches live data from a weather API
- Detects temperature, city, and day/night cycle
- Converts raw weather data into simplified categories: **hot**, **warm**, **cold**

### 👕 Dynamic Clothing Recommendations

- Displays clothing items that match the current weather
- Items open in a full-size preview modal
- Clothing is filtered automatically based on temperature

### ➕ Add New Garments

- Authorized users can add new clothing items
- Items render instantly after submission
- Each item is associated with the user who created it

### ❤️ Like / Unlike Items

- Logged-in users can like and unlike clothing items
- Likes are persisted in the backend database
- UI updates instantly to reflect changes

### 🔐 Authentication & Authorization

- User registration and login
- JWT-based authentication
- Protected profile route
- Persistent login using localStorage

### 🌓 Day / Night UI Behavior

- UI reflects day or night based on sunrise/sunset
- Weather visuals adjust automatically

### 📱 Fully Responsive Design

- Optimized for desktop, tablet, and mobile
- Hamburger menu for mobile navigation
- Layout scales smoothly down to 375px width

---

## 🚀 Live Demo

🎥 **Video Demo**
[https://youtu.be/pGzW_MDcuLc](https://youtu.be/pGzW_MDcuLc)

(Deployment optional for this project)

---

## 🛠 Technologies Used

### Frontend

- React
- Vite
- JavaScript (ES6+)
- CSS (BEM methodology)
- Responsive media queries

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication

### Tools & Libraries

- React Hooks (`useState`, `useEffect`, `useContext`)
- Fetch API
- Git & GitHub

### APIs

- Weather API (OpenWeatherMap or equivalent)
- Custom weather utility functions:
  - `getCurrentWeather`
  - `parseWeatherData`
  - `getWeatherCondition`

---

## 📂 Repositories

**Frontend Repository**
[https://github.com/ZachMolzner/se_project_react](https://github.com/ZachMolzner/se_project_react)

**Backend Repository**
[https://github.com/ZachMolzner/se_project_express](https://github.com/ZachMolzner/se_project_express)

---

## 🧪 Installation & Setup

### 1. Clone the frontend repository

```bash
git clone https://github.com/ZachMolzner/se_project_react.git
cd se_project_react
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

---

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_WEATHER_API_KEY=your_api_key_here
VITE_WEATHER_BASE_URL=https://api.openweathermap.org/data/2.5/
```

---

## 📌 Future Improvements

- Edit profile functionality
- Delete clothing items directly from profile
- Favorites filter
- Dark mode toggle
- Multi-language support

---

## 👤 Author

**Zach Molzner**
Software Engineer Trainee – TripleTen

GitHub: [https://github.com/ZachMolzner](https://github.com/ZachMolzner)
