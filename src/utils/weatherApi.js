import { API_KEY, COORDINATES } from "./constants.js";
import { checkResponse } from "./api.js";

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

export function getCurrentWeather() {
  const { latitude, longitude } = COORDINATES;

  const url = `${baseUrl}?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`;

  return fetch(url).then(checkResponse);
}

// Convert raw OpenWeather data into the structure our app expects
export function parseWeatherData(data) {
  return {
    temperature: Math.round(data.main.temp),
    city: data.name,
    condition: data.weather?.[0]?.main || "Clear",

    // timestamps (seconds since 1970)
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    currentTime: data.dt,
  };
}

// Map temperature → hot/warm/cold
export function getWeatherCondition(temp) {
  if (temp >= 86) {
    return "hot";
  } else if (temp >= 66) {
    return "warm";
  }
  return "cold";
}
