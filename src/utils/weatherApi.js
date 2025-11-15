import { API_KEY, COORDINATES } from "./constants.js";

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

export function getCurrentWeather() {
  const { latitude, longitude } = COORDINATES;

  const url = `${baseUrl}?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`;

  return fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(`Weather API error: ${res.status}`);
    }
    return res.json();
  });
}

// Now we also grab condition, sunrise, sunset, and currentTime
export function parseWeatherData(data) {
  return {
    temperature: Math.round(data.main.temp),
    city: data.name,
    condition: data.weather?.[0]?.main || "Clear", // e.g. "Clear", "Clouds", "Rain"
    sunrise: data.sys.sunrise, // seconds since 1970
    sunset: data.sys.sunset, // seconds since 1970
    currentTime: data.dt, // seconds since 1970
  };
}

export function getWeatherCondition(temp) {
  if (temp >= 86) {
    return "hot";
  } else if (temp >= 66) {
    return "warm";
  } else {
    return "cold";
  }
}
