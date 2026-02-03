import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Profile from "../Profile/Profile.jsx";
import Footer from "../Footer/Footer.jsx";

import ItemModal from "../ItemModal/ItemModal.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal.jsx";

// ✅ REQUIRED MODALS (Sprint 14)
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";

// ✅ Items API
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
  editProfile,
} from "../../utils/api.js";

// ✅ Auth API
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

  // ✅ Sprint 14 auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  // ✅ Required auth modals
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  // ---------- LOAD CLOTHING ITEMS (PUBLIC) ----------
  useEffect(() => {
    getItems()
      .then((items) => setClothingItems(items))
      .catch((err) => console.error("Error loading items:", err));
  }, []);

  // ---------- TOKEN CHECK ON LOAD ----------
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    checkToken(token)
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error("Token check failed:", err);
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        setCurrentUser({});
      });
  }, []);

  // ---------- LOAD WEATHER ----------
  useEffect(() => {
    getCurrentWeather()
      .then((data) => {
        const parsed = parseWeatherData(data);
        const tempF = parsed.temperature;

        const isDay =
          parsed.currentTime >= parsed.sunrise &&
          parsed.currentTime <= parsed.sunset;

        const weatherType = getWeatherCondition(tempF);

        const weatherForState = {
          city: parsed.city,
          condition: parsed.condition,
          isDay,
          weatherType,
          temperature: {
            F: tempF,
            C: Math.round((tempF - 32) * (5 / 9)),
          },
        };

        setWeatherData(weatherForState);
      })
      .catch((err) => console.error("Weather error:", err));
  }, []);

  // ---------- TEMP TOGGLE ----------
  function handleToggleSwitchChange() {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  }

  // ---------- OPEN MODALS ----------
  function openAddItemModal() {
    setIsAddItemModalOpen(true);
  }

  function openRegisterModal() {
    setIsRegisterModalOpen(true);
  }

  function openLoginModal() {
    setIsLoginModalOpen(true);
  }

  function openEditProfileModal() {
    setIsEditProfileModalOpen(true);
  }

  // ---------- UNIVERSAL MODAL CLOSER ----------
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

  // ---------- CARD / ITEM MODAL ----------
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsItemModalOpen(true);
  }

  // ---------- ADD ITEM ----------
  function handleAddItemSubmit({ name, weather, imageUrl }) {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    addItem({ name, weather, imageUrl }, token)
      .then((newItem) => {
        setClothingItems((prev) => [newItem, ...prev]);
        closeAllModals();
      })
      .catch((err) => console.error("Add item error:", err));
  }

  // ---------- DELETE CONFIRMATION FLOW ----------
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
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => item._id !== id && item.id !== id),
        );
        closeAllModals();
      })
      .catch((err) => console.error("Delete error:", err));
  }

  // ---------- ✅ LIKES (SPRINT 14 TASK 4) ----------
  function handleCardLike({ id, isLiked }) {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    const request = !isLiked
      ? addCardLike(id, token)
      : removeCardLike(id, token);

    request
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) =>
            (item._id ?? item.id) === id ? updatedCard : item,
          ),
        );

        if (selectedCard && (selectedCard._id ?? selectedCard.id) === id) {
          setSelectedCard(updatedCard);
        }
      })
      .catch((err) => console.error("Like error:", err));
  }

  // ---------- AUTH HANDLERS ----------
  function handleRegister({ name, avatar, email, password }) {
    return register({ name, avatar, email, password })
      .then(() => handleLogin({ email, password }))
      .catch((err) => console.error("Register error:", err));
  }

  function handleLogin({ email, password }) {
    return authorize({ email, password })
      .then((res) => {
        if (!res?.token) return Promise.reject(new Error("No token returned"));
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        return checkToken(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllModals();
      })
      .catch((err) => console.error("Login error:", err));
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
    closeAllModals();
  }

  // ---------- EDIT PROFILE ----------
  function handleEditProfile({ name, avatar }) {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    editProfile({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllModals();
      })
      .catch((err) => console.error("Edit profile error:", err));
  }

  // ---------- ESCAPE KEY HANDLER ----------
  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") closeAllModals();
    };

    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <BrowserRouter basename="/se_project_react">
          <div className="page">
            <div className="page__content">
              <Header
                city={weatherData?.city}
                onAddClothesClick={openAddItemModal}
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
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
                      currentUserId={currentUser?._id}
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
                        currentUserId={currentUser?._id}
                      />
                    </ProtectedRoute>
                  }
                />
              </Routes>

              <Footer />
            </div>
          </div>

          {/* ITEM PREVIEW MODAL */}
          <ItemModal
            isOpen={isItemModalOpen}
            selectedCard={selectedCard}
            onClose={closeAllModals}
            onDeleteRequest={handleOpenConfirmDelete}
            currentUserId={currentUser?._id}
          />

          {/* ADD ITEM MODAL */}
          <AddItemModal
            isOpen={isAddItemModalOpen}
            onClose={closeAllModals}
            onAddItem={handleAddItemSubmit}
          />

          {/* DELETE CONFIRM */}
          <DeleteConfirmationModal
            isOpen={isConfirmModalOpen}
            onClose={closeAllModals}
            onConfirm={handleConfirmDelete}
          />

          {/* REQUIRED AUTH MODALS */}
          <RegisterModal
            isOpen={isRegisterModalOpen}
            onClose={closeAllModals}
            onRegister={handleRegister}
          />

          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={closeAllModals}
            onLogin={handleLogin}
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
