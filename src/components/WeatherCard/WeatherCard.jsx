import "./WeatherCard.css";

function WeatherCard({ temperature, condition, isDay }) {
  // Normalize the condition text from the API
  const normalizedCondition = (condition || "").toLowerCase();

  // Determine variant (WTWR supports: clear, cloudy, rain, snow, fog)
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

  // Builds class like: weather-card_theme_day-rain
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
