import { useContext } from "react";
import "./WeatherCard.css";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  // No weather data yet -> don't render anything
  if (!weatherData) return null;

  const { temperature, condition, isDay } = weatherData;

  // Get correct temperature unit
  const temp = temperature[currentTemperatureUnit];

  // Normalize condition text
  const normalizedCondition = (condition || "").toLowerCase();

  // Determine background variant
  let variant = "clear";

  if (normalizedCondition.includes("cloud")) {
    variant = "cloudy";
  } else if (
    normalizedCondition.includes("rain") ||
    normalizedCondition.includes("drizzle")
  ) {
    variant = "rain";
  } else if (normalizedCondition.includes("snow")) {
    variant = "snow";
  } else if (
    normalizedCondition.includes("fog") ||
    normalizedCondition.includes("mist") ||
    normalizedCondition.includes("haze") ||
    normalizedCondition.includes("smoke")
  ) {
    variant = "fog";
  }

  // Build final classname (matches Figma)
  const themeClass = `weather-card_theme_${isDay ? "day" : "night"}-${variant}`;

  return (
    <section className={`weather-card ${themeClass}`}>
      <p className="weather-card__temp">
        {temp}°{currentTemperatureUnit}
      </p>
    </section>
  );
}

export default WeatherCard;
