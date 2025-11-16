import "./WeatherCard.css";

function WeatherCard({ temperature, condition, isDay }) {
  const normalizedCondition = (condition || "").toLowerCase();

  // Determine variant (WTWR supports: clear, cloudy, rain, snow, fog)
  let variant = "clear";

  if (normalized.includes("cloud")) {
    variant = "cloudy";
  } else if (normalized.includes("rain") || normalized.includes("drizzle")) {
    variant = "rain";
  } else if (normalized.includes("snow")) {
    variant = "snow";
  } else if (
    normalized.includes("fog") ||
    normalized.includes("mist") ||
    normalized.includes("haze") ||
    normalized.includes("smoke")
  ) {
    variant = "fog";
  }

  // weather-card weather-card_theme_day-rain
  const themeClass = `weather-card_theme_${isDay ? "day" : "night"}-${variant}`;

  return (
    <section className={`weather-card ${themeClass}`}>
      <p className="weather-card__temp">
        {temperature !== null ? `${Math.round(temperature)}°F` : "--°F"}
      </p>
    </section>
  );
}

export default WeatherCard;
