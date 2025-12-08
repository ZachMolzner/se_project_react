// src/components/App/App.jsx
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Profile from "../Profile/Profile.jsx";
import Footer from "../Footer/Footer.jsx";

import ItemModal from "../ItemModal/ItemModal.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal.jsx";

import { getItems, addItem, deleteItem } from "../../utils/api.js";
import {
  getCurrentWeather,
  parseWeatherData,
  getWeatherCondition,
} from "../../utils/weatherApi.js";

import CurrentTemperatureUnitContext from "../../Contexts/CurrentTemperatureUnitContext";
import "./App.css";

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

  // ---------- LOAD CLOTHING ITEMS ----------
  useEffect(() => {
    getItems()
      .then((items) => setClothingItems(items))
      .catch((err) => console.error("Error loading items:", err));
  }, []);

  // ---------- LOAD WEATHER ----------
  useEffect(() => {
    getCurrentWeather()
      .then((data) => {
        const parsed = parseWeatherData(data);
        // parsed = { temperature, city, condition, sunrise, sunset, currentTime }

        const tempF = parsed.temperature;

        const isDay =
          parsed.currentTime >= parsed.sunrise &&
          parsed.currentTime <= parsed.sunset;

        const weatherType = getWeatherCondition(tempF); // "hot" | "warm" | "cold"

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

  // ---------- CARD / ITEM MODAL ----------
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsItemModalOpen(true);
  }

  function handleItemModalClose() {
    setIsItemModalOpen(false);
    setSelectedCard(null);
  }

  // ---------- ADD ITEM ----------
  function openAddItemModal() {
    setIsAddItemModalOpen(true);
  }

  function closeAddItemModal() {
    setIsAddItemModalOpen(false);
  }

  // called from AddItemModal via onAddItem({ name, weather, imageUrl })
  function handleAddItemSubmit({ name, weather, imageUrl }) {
    addItem({ name, weather, imageUrl })
      .then((newItem) => {
        setClothingItems((prev) => [newItem, ...prev]);
        closeAddItemModal();
      })
      .catch((err) => console.error("Add item error:", err));
  }

  // ---------- DELETE CONFIRMATION FLOW ----------
  function handleOpenConfirmDelete(card) {
    setItemPendingDelete(card);
    setIsConfirmModalOpen(true);
  }

  function handleCloseConfirmDelete() {
    setIsConfirmModalOpen(false);
    setItemPendingDelete(null);
  }

  function handleConfirmDelete() {
    if (!itemPendingDelete) return;

    // json-server uses "id" by default; fall back to _id if needed
    const id = itemPendingDelete.id ?? itemPendingDelete._id;

    deleteItem(id)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => item.id !== id && item._id !== id)
        );
        handleCloseConfirmDelete();
        handleItemModalClose();
      })
      .catch((err) => console.error("Delete error:", err));
  }
  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllModals();
      }
    };

    document.addEventListener("keydown", closeByEscape);

    return () => {
      document.removeEventListener("keydown", closeByEscape);
    };
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <BrowserRouter basename="/se_project_react">
        <div className="page">
          <div className="page__content">
            <Header
              city={weatherData?.city}
              onAddClothesClick={openAddItemModal}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    onSelectCard={handleCardClick}
                  />
                }
              />

              <Route
                path="/profile"
                element={
                  <Profile
                    clothingItems={clothingItems}
                    onSelectCard={handleCardClick}
                    onAddItem={openAddItemModal}
                  />
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
          onClose={handleItemModalClose}
          onDeleteRequest={handleOpenConfirmDelete}
        />

        {/* ADD ITEM MODAL */}
        <AddItemModal
          isOpen={isAddItemModalOpen}
          onClose={closeAddItemModal}
          onAddItem={handleAddItemSubmit}
        />

        {/* DELETE CONFIRMATION MODAL */}
        <DeleteConfirmationModal
          isOpen={isConfirmModalOpen}
          onClose={handleCloseConfirmDelete}
          onConfirm={handleConfirmDelete}
        />
      </BrowserRouter>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
