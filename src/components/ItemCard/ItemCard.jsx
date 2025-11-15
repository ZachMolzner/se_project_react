import "./ItemCard.css";

function ItemCard({ card, onCardClick }) {
  return (
    <li className="card" onClick={() => onCardClick(card)}>
      <p className="card__title">{card.name}</p>
      <img src={card.link} alt={card.name} className="card__image" />
    </li>
  );
}

export default ItemCard;
