// src/components/SideBar/SideBar.jsx
import { useContext } from "react";
import "./SideBar.css";

import avatarFallback from "../../assets/avatar.svg";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";

const SideBar = ({ onEditProfile, onSignOut }) => {
  const currentUser = useContext(CurrentUserContext);

  const userName = currentUser?.name || "User";
  const avatarSrc = currentUser?.avatar || avatarFallback;
  const fallbackLetter = userName.trim()?.[0]?.toUpperCase() || "U";

  return (
    <section className="sidebar">
      {/* LEFT: avatar */}
      {currentUser?.avatar ? (
        <img
          src={avatarSrc}
          className="sidebar__avatar"
          alt={`${userName} avatar`}
        />
      ) : (
        <div className="sidebar__avatar-placeholder">{fallbackLetter}</div>
      )}

      {/* RIGHT: user info */}
      <div className="sidebar__info">
        <p className="sidebar__name">{userName}</p>

        <button type="button" className="sidebar__link" onClick={onEditProfile}>
          Change profile data
        </button>

        <button type="button" className="sidebar__link" onClick={onSignOut}>
          Log out
        </button>
      </div>
    </section>
  );
};

export default SideBar;
