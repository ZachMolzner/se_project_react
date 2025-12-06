import "./ItemCard.css";

function ItemCard({ card, onCardClick }) {
  return (
    <li
      className="card"
      data-weather={card.weather}
      onClick={() => onCardClick(card)}
    >
      <p className="card__title">{card.name}</p>

      <img
        src={card.imageUrl} // ✔ FIXED from "link" → "imageUrl"
        alt={card.name}
        className="card__image"
      />

      {/* Optional: visible weather label depending on your Figma */}
      {/* <p className="card__weather">{card.weather}</p> */}
    </li>
  );
}

export default ItemCard;
