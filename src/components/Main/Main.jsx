import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";

function Main({
  temperature,
  condition,
  isDay,
  weatherType,
  cards,
  onCardClick,
}) {
  // Filter clothing by weather type
  const filteredCards = cards.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });

  return (
    <main className="main">
      {/* Weather banner */}
      <WeatherCard
        temperature={temperature}
        condition={condition}
        isDay={isDay}
      />

      {/* Clothing section title */}
      <p className="main__text">
        Today is {temperature}°F — you may want to wear:
      </p>

      {/* Clothing cards */}
      <ul className="main__cards">
        {filteredCards.map((item) => (
          <ItemCard key={item._id} card={item} onCardClick={onCardClick} />
        ))}
      </ul>
    </main>
  );
}

export default Main;
