// src/components/Header/Header.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import avatarImage from "../../assets/avatar.svg";
import logoImage from "../../assets/Logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

import "./Header.css";

function Header({
  city,
  onAddClothesClick,
  isLoggedIn,
  currentUser,
  onLoginClick,
  onRegisterClick,
}) {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ---------- DATE FORMATTING ----------
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

  const username = currentUser?.name || "User";
  const avatarSrc = currentUser?.avatar || avatarImage;
  const fallbackLetter = username?.trim()?.[0]?.toUpperCase() || "U";

  return (
    <header className="header">
      <div className="header__main-row">
        {/* ---------- LEFT SIDE ---------- */}
        <div className="header__left">
          <Link to="/" className="header__logo-link">
            <img src={logoImage} alt="WTWR Logo" className="header__logo" />
          </Link>

          <p className="header__date-location">
            {formattedDate}, {city || "Loading..."}
          </p>
        </div>

        {/* ---------- RIGHT SIDE (DESKTOP) ---------- */}
        <div className="header__right">
          {/* ToggleSwitch */}
          <ToggleSwitch />

          {/* Auth-aware controls */}
          {isLoggedIn ? (
            <>
              {/* Add Clothes (authorized only) */}
              <button
                type="button"
                className="header__add-clothes"
                onClick={onAddClothesClick}
              >
                + Add clothes
              </button>

              {/* Profile link */}
              <Link to="/profile" className="header__user">
                <span className="header__username-button">{username}</span>

                {currentUser?.avatar ? (
                  <img
                    src={avatarSrc}
                    alt={`${username} avatar`}
                    className="header__avatar"
                  />
                ) : (
                  <div className="header__avatar-placeholder">
                    {fallbackLetter}
                  </div>
                )}
              </Link>
            </>
          ) : (
            <>
              <button
                type="button"
                className="header__auth-button"
                onClick={onRegisterClick}
              >
                Sign up
              </button>
              <button
                type="button"
                className="header__auth-button header__auth-button_secondary"
                onClick={onLoginClick}
              >
                Log in
              </button>
            </>
          )}
        </div>

        {/* ---------- MOBILE HAMBURGER ---------- */}
        <button
          type="button"
          className="header__hamburger"
          onClick={toggleMobileMenu}
          aria-label="Open menu"
        >
          <span className="header__hamburger-line"></span>
          <span className="header__hamburger-line"></span>
        </button>
      </div>

      {/* ---------- MOBILE MENU OVERLAY ---------- */}
      {isMobileMenuOpen && (
        <div className="header__overlay" onClick={toggleMobileMenu}>
          <div
            className="header__mobile-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="header__mobile-close"
              onClick={toggleMobileMenu}
              aria-label="Close menu"
            >
              ✕
            </button>

            {isLoggedIn ? (
              <>
                {/* MOBILE — PROFILE */}
                <button
                  type="button"
                  className="header__mobile-user-row"
                  onClick={goToProfile}
                >
                  {currentUser?.avatar ? (
                    <img
                      src={avatarSrc}
                      alt={`${username} avatar`}
                      className="header__mobile-avatar"
                    />
                  ) : (
                    <div className="header__mobile-avatar-placeholder">
                      {fallbackLetter}
                    </div>
                  )}

                  <span className="header__mobile-name">{username}</span>
                </button>

                {/* MOBILE — ADD CLOTHES */}
                <button
                  type="button"
                  className="header__mobile-add"
                  onClick={() => {
                    toggleMobileMenu();
                    onAddClothesClick();
                  }}
                >
                  + Add clothes
                </button>
              </>
            ) : (
              <>
                {/* MOBILE — AUTH BUTTONS */}
                <button
                  type="button"
                  className="header__mobile-auth"
                  onClick={() => {
                    toggleMobileMenu();
                    onRegisterClick();
                  }}
                >
                  Sign up
                </button>
                <button
                  type="button"
                  className="header__mobile-auth header__mobile-auth_secondary"
                  onClick={() => {
                    toggleMobileMenu();
                    onLoginClick();
                  }}
                >
                  Log in
                </button>
              </>
            )}

            {/* MOBILE — TOGGLE SWITCH */}
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
