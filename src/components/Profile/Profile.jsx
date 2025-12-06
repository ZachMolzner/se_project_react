// src/components/Profile/Profile.jsx
import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

const Profile = ({ clothingItems, onSelectCard, onAddItem }) => {
  return (
    <section className="profile">
      <SideBar />

      <div className="profile__clothes-area">
        <div className="profile__header-row">
          <h2 className="profile__title">Your items</h2>
          <button
            type="button"
            className="profile__add-button"
            onClick={onAddItem}
          >
            + Add new
          </button>
        </div>

        <ClothesSection
          clothingItems={clothingItems}
          onSelectCard={onSelectCard}
        />
      </div>
    </section>
  );
};

export default Profile;
