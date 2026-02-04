// src/components/ClothesSection/ClothesSection.jsx
import "./ClothesSection.css";
import { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";

function ClothesSection({
  clothingItems,
  onSelectCard,
  onCardLike,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

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
            />
          );
        })}
      </ul>
    </section>
  );
}

export default ClothesSection;
