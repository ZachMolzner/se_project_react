// src/components/Header/Header.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

import logo from "../../assets/Logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../../ToggleSwitch/ToggleSwitch.jsx";

function Header({ city, onAddClothesClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Date + city text
  const today = new Date();
  const options = { month: "short", day: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options);
  const locationText = city || "Loading...";
  const dateLocationText = `${formattedDate}, ${locationText}`;

  const toggleMobileMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleOverlayClick = () => {
    setIsMenuOpen(false);
  };

  const handleAddClothesFromMenu = () => {
    setIsMenuOpen(false);
    onAddClothesClick();
  };

  // DESKTOP: username click → profile
  const handleDesktopProfileClick = () => {
    navigate("/profile");
  };

  // MOBILE: username row click → profile + close menu
  const handleMobileProfileClick = () => {
    setIsMenuOpen(false);
    navigate("/profile");
  };

  return (
    <header className="header">
      <div className="header__main-row">
        {/* LEFT: logo (clickable) + date/location */}
        <div className="header__left">
          <Link to="/" className="header__logo-link">
            <img src={logo} alt="WTWR logo" className="header__logo" />
          </Link>
          <p className="header__date-location">{dateLocationText}</p>
        </div>

        {/* RIGHT: desktop controls */}
        <div className="header__right">
          <ToggleSwitch />

          <button
            type="button"
            className="header__add-clothes"
            onClick={onAddClothesClick}
          >
            + Add clothes
          </button>

          <button
            type="button"
            className="header__username-button"
            onClick={handleDesktopProfileClick}
          >
            Zach Molzner
          </button>

          <button
            type="button"
            className="header__avatar-button"
            onClick={handleDesktopProfileClick}
          >
            <img src={avatar} alt="User avatar" className="header__avatar" />
          </button>
        </div>

        {/* HAMBURGER – visible only at mobile via CSS */}
        <button
          type="button"
          className="header__hamburger"
          onClick={toggleMobileMenu}
          aria-label="Open menu"
        >
          <span className="header__hamburger-line" />
          <span className="header__hamburger-line" />
        </button>
      </div>

      {/* MOBILE OVERLAY MENU */}
      {isMenuOpen && (
        <div className="header__overlay" onClick={handleOverlayClick}>
          <div
            className="header__mobile-card"
            onClick={(e) => e.stopPropagation()} // keep clicks inside from closing
          >
            <button
              type="button"
              className="header__mobile-close"
              onClick={toggleMobileMenu}
              aria-label="Close menu"
            >
              ×
            </button>

            {/* USER ROW – this is the thing you tap to go to profile */}
            <button
              type="button"
              className="header__mobile-user-row"
              onClick={handleMobileProfileClick}
            >
              <span className="header__mobile-name">Zach Molzner</span>
              <img
                src={avatar}
                alt="User avatar"
                className="header__mobile-avatar"
              />
            </button>

            <button
              type="button"
              className="header__mobile-add"
              onClick={handleAddClothesFromMenu}
            >
              + Add clothes
            </button>

            <div className="header__mobile-toggle">
              <ToggleSwitch />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
