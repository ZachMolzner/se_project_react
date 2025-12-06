// src/components/Header/Header.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import avatarImage from "../../assets/avatar.svg";
import logoImage from "../../assets/Logo.svg"; // FIX: Use correct import
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";

function Header({ city, onAddClothesClick }) {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // -------- DATE FORMATTING (FULL MONTH NAME) --------
  const today = new Date();
  const options = { month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options);

  function toggleMobileMenu() {
    setIsMobileMenuOpen((prev) => !prev);
  }

  function goToProfile() {
    setIsMobileMenuOpen(false);
    navigate("/profile");
  }

  return (
    <header className="header">
      <div className="header__main-row">
        {/* LEFT SECTION */}
        <div className="header__left">
          <Link to="/" className="header__logo-link">
            <img src={logoImage} alt="WTWR Logo" className="header__logo" />
          </Link>

          <p className="header__date-location">
            {formattedDate}, {city || "Loading..."}
          </p>
        </div>

        {/* RIGHT — DESKTOP ONLY */}
        <div className="header__right">
          <button className="header__add-clothes" onClick={onAddClothesClick}>
            + Add clothes
          </button>

          <Link to="/profile" className="header__user">
            <span className="header__username-button">Your profile</span>
            <img
              src={avatarImage}
              alt="User avatar"
              className="header__avatar"
            />
          </Link>

          <ToggleSwitch />
        </div>

        {/* MOBILE HAMBURGER */}
        <button className="header__hamburger" onClick={toggleMobileMenu}>
          <span className="header__hamburger-line"></span>
          <span className="header__hamburger-line"></span>
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {isMobileMenuOpen && (
        <div className="header__overlay" onClick={toggleMobileMenu}>
          <div
            className="header__mobile-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="header__mobile-close" onClick={toggleMobileMenu}>
              ✕
            </button>

            {/* MOBILE PROFILE BUTTON */}
            <button className="header__mobile-user-row" onClick={goToProfile}>
              <img
                src={avatarImage}
                alt="User"
                className="header__mobile-avatar"
              />
              <span className="header__mobile-name">Your profile</span>
            </button>

            {/* MOBILE ADD CLOTHES */}
            <button
              className="header__mobile-add"
              onClick={() => {
                toggleMobileMenu();
                onAddClothesClick();
              }}
            >
              + Add clothes
            </button>

            {/* MOBILE TOGGLE SWITCH */}
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
