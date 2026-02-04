// src/components/Profile/Profile.jsx
import "./Profile.css";
import { useContext } from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";

const Profile = ({
  clothingItems,
  onSelectCard,
  onAddItem,
  onCardLike,
  isLoggedIn,
  onSignOut,
  onEditProfile,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const currentUserId = currentUser?._id;

  //  Sprint 14: show only items added by the current user
  const userItems = clothingItems.filter((item) => {
    const ownerId = item.owner?._id ?? item.owner; // supports owner as object or string
    return ownerId === currentUserId;
  });

  return (
    <section className="profile">
      <SideBar onEditProfile={onEditProfile} onSignOut={onSignOut} />

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
          clothingItems={userItems}
          onSelectCard={onSelectCard}
          onCardLike={onCardLike}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </section>
  );
};

export default Profile;
