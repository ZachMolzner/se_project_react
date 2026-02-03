// src/components/ItemCard/ItemCard.jsx
import "./ItemCard.css";

function ItemCard({
  card,
  onCardClick,
  onCardLike,
  isLoggedIn,
  currentUserId,
}) {
  const cardImage = card.imageUrl || card.link;

  // ✅ Robust like check (supports string IDs or populated objects)
  const isLiked =
    isLoggedIn &&
    currentUserId &&
    Array.isArray(card.likes) &&
    card.likes.some((like) => (like._id ?? like) === currentUserId);

  const handleLikeClick = (e) => {
    e.stopPropagation(); // prevents opening the item modal
    if (!isLoggedIn) return;

    const id = card._id ?? card.id;
    onCardLike({ id, isLiked });
  };

  return (
    <li
      className="card"
      data-weather={card.weather}
      onClick={() => onCardClick(card)}
    >
      <div className="card__header">
        <p className="card__title">{card.name}</p>

        {isLoggedIn && (
          <button
            type="button"
            className={`card__like-button ${
              isLiked ? "card__like-button_active" : ""
            }`}
            onClick={handleLikeClick}
            aria-label={isLiked ? "Unlike item" : "Like item"}
          />
        )}
      </div>

      <img src={cardImage} alt={card.name} className="card__image" />
    </li>
  );
}

export default ItemCard;
