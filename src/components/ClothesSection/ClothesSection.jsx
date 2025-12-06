// src/components/ClothesSection/ClothesSection.jsx
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ clothingItems, onSelectCard }) {
  return (
    <section className="clothes">
      <ul className="clothes__list">
        {clothingItems.map((item) => (
          <ItemCard
            key={item.id ?? item._id ?? item.name}
            card={item}
            onCardClick={onSelectCard}
          />
        ))}
      </ul>
    </section>
  );
}

export default ClothesSection;
