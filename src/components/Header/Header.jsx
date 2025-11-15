import { useState } from "react";
import "./Header.css";
import avatar from "../../assets/avatar.svg";
import logo from "../../assets/Logo.svg";

function Header({ date, city, onAddClothesClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  function handleAddFromMenu() {
    toggleMenu();
    onAddClothesClick();
  }

  return (
    <header className="header">
      <div className="header__main-row">
        <div className="header__left">
          <img src={logo} alt="WTWR logo" className="header__logo" />

          <p className="header__date-location">
            {date}, {city || "Loading..."}
          </p>
        </div>

        <div className="header__right">
          <button
            type="button"
            className="header__add-clothes"
            onClick={onAddClothesClick}
          >
            + Add clothes
          </button>
          <span className="header__username">Zach Molzner</span>
          <img src={avatar} className="header__avatar" alt="user avatar" />
        </div>

        {/* HAMBURGER — visible only on phone via CSS */}
        <button className="header__hamburger" onClick={toggleMenu}>
          <div className={`hamburger ${isMenuOpen ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      {isMenuOpen && (
        <div className="header__overlay">
          <div className="header__mobile-card">
            <button
              type="button"
              className="header__mobile-close"
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              ×
            </button>

            <div className="header__mobile-user-row">
              <span className="header__mobile-name">Zach Molzner</span>
              <img
                src={avatar}
                alt="user avatar"
                className="header__mobile-avatar"
              />
            </div>

            <button
              type="button"
              className="header__mobile-add"
              onClick={handleAddFromMenu}
            >
              + Add clothes
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
