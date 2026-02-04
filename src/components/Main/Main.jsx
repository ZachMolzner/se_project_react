// src/components/Main/Main.jsx
import "./Main.css";
import { useContext } from "react";

import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext";

function Main({
  weatherData,
  clothingItems = [],
  onSelectCard,
  onCardLike,
  isLoggedIn,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  if (!weatherData) {
    return (
      <main className="main">
        <p className="main__text">Loading weather...</p>
      </main>
    );
  }

  const displayTemp = weatherData.temperature[currentTemperatureUnit];
  const weatherType = weatherData.weatherType || "cold";

  // Filter items based on weatherType
  const filteredItems = clothingItems.filter((item) => {
    if (!item.weather) return false;
    return item.weather.toLowerCase() === weatherType;
  });

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />

      <p className="main__text">
        Today is {displayTemp}°{currentTemperatureUnit} — you may want to wear:
      </p>

      <ul className="main__cards">
        {filteredItems.map((item) => {
          const key = item.id ?? item._id ?? `${item.name}-${item.imageUrl}`;

          return (
            <ItemCard
              key={key}
              card={item}
              onCardClick={onSelectCard}
              onCardLike={onCardLike}
              isLoggedIn={isLoggedIn}
            />
          );
        })}
      </ul>
    </main>
  );
}

export default Main;
