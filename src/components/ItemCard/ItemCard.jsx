// src/components/ItemCard/ItemCard.jsx
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
        src={card.imageUrl || card.link}
        alt={card.name}
        className="card__image"
      />
    </li>
  );
}

export default ItemCard;
