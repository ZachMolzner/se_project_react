// src/components/ClothesSection/ClothesSection.jsx
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  clothingItems,
  onSelectCard,
  onCardLike,
  isLoggedIn,
  currentUserId,
}) {
  return (
    <section className="clothes">
      <ul className="clothes__list">
        {clothingItems.map((item) => {
          const key =
            item._id ?? item.id ?? `${item.name}-${item.imageUrl || item.link}`;

          return (
            <ItemCard
              key={key}
              card={item}
              onCardClick={onSelectCard}
              onCardLike={onCardLike}
              isLoggedIn={isLoggedIn}
              currentUserId={currentUserId}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default ClothesSection;
