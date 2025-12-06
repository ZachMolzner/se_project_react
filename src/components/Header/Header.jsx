// src/components/Header/Header.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext";
import avatarImage from "../../assets/avatar.svg";
import "./Header.css";

function Header({ city, onAddClothesClick }) {
  const navigate = useNavigate();
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        {/* LEFT — LOGO + LOCATION */}
        <div className="header__left">
          {/* Clicking logo → home */}
          <Link to="/" className="header__logo-link">
            <img
              src="/se_project_react/logo.svg"
              alt="WTWR Logo"
              className="header__logo"
            />
          </Link>

          <p className="header__date-location">{city || "Loading..."}</p>
        </div>

        {/* RIGHT — DESKTOP */}
        <div className="header__right">
          <button className="header__add-clothes" onClick={onAddClothesClick}>
            + Add clothes
          </button>

          {/* DESKTOP NAV LINK TO /PROFILE */}
          <Link to="/profile" className="header__user">
            <span className="header__username-button">Your profile</span>
            <img
              src={avatarImage}
              alt="User avatar"
              className="header__avatar"
            />
          </Link>

          {/* Temperature Toggle */}
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={currentTemperatureUnit === "C"}
              onChange={handleToggleSwitchChange}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        {/* HAMBURGER BUTTON — MOBILE ONLY */}
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

            {/* MOBILE PROFILE LINK */}
            <button className="header__mobile-user-row" onClick={goToProfile}>
              <img src={avatarImage} className="header__mobile-avatar" />
              <span className="header__mobile-name">Your profile</span>
            </button>

            {/* Add clothes (mobile) */}
            <button
              className="header__mobile-add"
              onClick={() => {
                onAddClothesClick();
                toggleMobileMenu();
              }}
            >
              + Add clothes
            </button>

            {/* Temperature Toggle */}
            <div className="header__mobile-toggle">
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={currentTemperatureUnit === "C"}
                  onChange={handleToggleSwitchChange}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
