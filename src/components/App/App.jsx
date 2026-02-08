// src/components/App/App.jsx
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Profile from "../Profile/Profile.jsx";
import Footer from "../Footer/Footer.jsx";

import ItemModal from "../ItemModal/ItemModal.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal.jsx";

// REQUIRED MODALS (Sprint 14)
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";

// Items API
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
  editProfile,
} from "../../utils/api.js";

// Auth API
import { register, authorize, checkToken } from "../../utils/auth.js";

// Weather API
import {
  getCurrentWeather,
  parseWeatherData,
  getWeatherCondition,
} from "../../utils/weatherApi.js";

// Contexts
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";

import "./App.css";

// Simple route guard
function ProtectedRoute({ isLoggedIn, children }) {
  return isLoggedIn ? children : <Navigate to="/" replace />;
}

function App() {
  // ---------- STATE ----------
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);

  const [selectedCard, setSelectedCard] = useState(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [itemPendingDelete, setItemPendingDelete] = useState(null);

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  // Auth modals
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  // ---------- LOAD ITEMS ----------
  useEffect(() => {
    getItems()
      .then(setClothingItems)
      .catch((err) => console.error("Error loading items:", err));
  }, []);

  // ---------- TOKEN CHECK ----------
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    checkToken(token)
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        setCurrentUser({});
      });
  }, []);

  // ---------- WEATHER ----------
  useEffect(() => {
    getCurrentWeather()
      .then((data) => {
        const parsed = parseWeatherData(data);
        const tempF = parsed.temperature;

        setWeatherData({
          city: parsed.city,
          condition: parsed.condition,
          isDay:
            parsed.currentTime >= parsed.sunrise &&
            parsed.currentTime <= parsed.sunset,
          weatherType: getWeatherCondition(tempF),
          temperature: {
            F: tempF,
            C: Math.round((tempF - 32) * (5 / 9)),
          },
        });
      })
      .catch((err) => console.error("Weather error:", err));
  }, []);

  // ---------- TEMP TOGGLE ----------
  function handleToggleSwitchChange() {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  }

  // ---------- MODAL OPENERS ----------
  const openAddItemModal = () => setIsAddItemModalOpen(true);
  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const openLoginModal = () => setIsLoginModalOpen(true);
  const openEditProfileModal = () => setIsEditProfileModalOpen(true);

  // ---------- MODAL SWITCHERS (FIGMA REQUIRED) ----------
  function handleSwitchToRegister() {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  }

  function handleSwitchToLogin() {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  }

  // ---------- CLOSE ALL MODALS ----------
  function closeAllModals() {
    setIsItemModalOpen(false);
    setIsAddItemModalOpen(false);
    setIsConfirmModalOpen(false);
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(false);
    setIsEditProfileModalOpen(false);
    setSelectedCard(null);
    setItemPendingDelete(null);
  }

  // ---------- CARD HANDLERS ----------
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsItemModalOpen(true);
  }

  function handleOpenConfirmDelete(card) {
    setItemPendingDelete(card);
    setIsConfirmModalOpen(true);
  }

  function handleConfirmDelete() {
    if (!itemPendingDelete) return;
    const token = localStorage.getItem("jwt");
    if (!token) return;

    const id = itemPendingDelete._id ?? itemPendingDelete.id;
    deleteItem(id, token)
      .then(() =>
        setClothingItems((prev) =>
          prev.filter((item) => (item._id ?? item.id) !== id),
        ),
      )
      .then(closeAllModals)
      .catch((err) => console.error("Delete error:", err));
  }

  // ---------- ADD ITEM ----------
  function handleAddItemSubmit(item) {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    addItem(item, token)
      .then((newItem) => setClothingItems((prev) => [newItem, ...prev]))
      .then(closeAllModals)
      .catch((err) => console.error("Add item error:", err));
  }

  // ---------- LIKES ----------
  function handleCardLike({ id, isLiked }) {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    const request = isLiked
      ? removeCardLike(id, token)
      : addCardLike(id, token);

    request
      .then((updatedCard) =>
        setClothingItems((items) =>
          items.map((item) =>
            (item._id ?? item.id) === id ? updatedCard : item,
          ),
        ),
      )
      .catch((err) => console.error("Like error:", err));
  }

  // ---------- AUTH ----------
  function handleRegister(data) {
    return register(data).then(() =>
      handleLogin({ email: data.email, password: data.password }),
    );
  }

  function handleLogin({ email, password }) {
    return authorize({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        return checkToken(res.token);
      })
      .then(setCurrentUser)
      .then(closeAllModals)
      .catch((err) => console.error("Login error:", err));
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
    closeAllModals();
  }

  function handleEditProfile(data) {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    editProfile(data, token)
      .then(setCurrentUser)
      .then(closeAllModals)
      .catch((err) => console.error("Edit profile error:", err));
  }

  // ---------- ESC KEY ----------
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && closeAllModals();
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <BrowserRouter>
          <div className="page">
            <div className="page__content">
              <Header
                city={weatherData?.city}
                onAddClothesClick={openAddItemModal}
                isLoggedIn={isLoggedIn}
                onLoginClick={openLoginModal}
                onRegisterClick={openRegisterModal}
              />

              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      clothingItems={clothingItems}
                      onSelectCard={handleCardClick}
                      onCardLike={handleCardLike}
                      isLoggedIn={isLoggedIn}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <Profile
                        clothingItems={clothingItems}
                        onSelectCard={handleCardClick}
                        onAddItem={openAddItemModal}
                        onSignOut={handleSignOut}
                        onEditProfile={openEditProfileModal}
                        onCardLike={handleCardLike}
                        isLoggedIn={isLoggedIn}
                      />
                    </ProtectedRoute>
                  }
                />
              </Routes>

              <Footer />
            </div>
          </div>

          {/* MODALS */}
          <ItemModal
            isOpen={isItemModalOpen}
            selectedCard={selectedCard}
            onClose={closeAllModals}
            onDeleteRequest={handleOpenConfirmDelete}
          />

          <AddItemModal
            isOpen={isAddItemModalOpen}
            onClose={closeAllModals}
            onAddItem={handleAddItemSubmit}
          />

          <DeleteConfirmationModal
            isOpen={isConfirmModalOpen}
            onClose={closeAllModals}
            onConfirm={handleConfirmDelete}
          />

          <RegisterModal
            isOpen={isRegisterModalOpen}
            onClose={closeAllModals}
            onRegister={handleRegister}
            onLoginClick={handleSwitchToLogin}
          />

          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={closeAllModals}
            onLogin={handleLogin}
            onSignUpClick={handleSwitchToRegister}
          />

          <EditProfileModal
            isOpen={isEditProfileModalOpen}
            onClose={closeAllModals}
            onEditProfile={handleEditProfile}
          />
        </BrowserRouter>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
