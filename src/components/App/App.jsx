import { useState, useEffect } from "react";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { defaultClothingItems } from "../../utils/clothingItems.js";
import {
  getCurrentWeather,
  parseWeatherData,
  getWeatherCondition,
} from "../../utils/weatherApi.js";
import "./App.css";

function App() {
  // include condition + isDay in state
  const [weatherData, setWeatherData] = useState({
    temperature: null,
    city: "",
    condition: "Clear",
    isDay: true,
  });

  const [weatherType, setWeatherType] = useState("cold");
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    getCurrentWeather()
      .then((data) => {
        const parsedWeather = parseWeatherData(data);

        const { temperature, city, condition, sunrise, sunset, currentTime } =
          parsedWeather;

        // Use API's time to determine day vs night
        const isDay = currentTime >= sunrise && currentTime <= sunset;

        setWeatherData({
          temperature,
          city,
          condition,
          isDay,
        });

        setWeatherType(getWeatherCondition(temperature));
      })
      .catch((err) => {
        console.error("Weather API error:", err);

        const fallbackTemp = 72;
        setWeatherData({
          temperature: fallbackTemp,
          city: "Phoenix",
          condition: "Clear",
          isDay: true,
        });
        setWeatherType(getWeatherCondition(fallbackTemp));
      });
  }, []);

  function handleOpenAddClothesModal() {
    setActiveModal("add-garment");
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setActiveModal("preview");
  }

  function handleCloseModal() {
    setActiveModal("");
    setSelectedCard(null);
  }

  function handleAddGarmentSubmit(evt) {
    evt.preventDefault();
    const form = evt.target;
    const name = form.name.value;
    const link = form.link.value;
    const weather = form.weather.value;

    const newItem = {
      _id: Date.now(),
      name,
      link,
      weather,
    };

    setClothingItems((prev) => [newItem, ...prev]);
    handleCloseModal();
  }

  return (
    <div className="page">
      <div className="page__content">
        <Header
          city={weatherData.city}
          onAddClothesClick={handleOpenAddClothesModal}
        />
        <Main
          temperature={weatherData.temperature}
          condition={weatherData.condition}
          isDay={weatherData.isDay}
          weatherType={weatherType}
          cards={clothingItems}
          onCardClick={handleCardClick}
        />
        <Footer />
      </div>
      <ModalWithForm
        name="add-garment"
        title="New garment"
        buttonText="Add garment"
        isOpen={activeModal === "add-garment"}
        onClose={handleCloseModal}
        onSubmit={handleAddGarmentSubmit}
      >
        <label className="modal__label">
          Name
          <input
            className="modal__input"
            type="text"
            name="name"
            placeholder="Name"
            required
          />
        </label>
        <label className="modal__label">
          Image
          <input
            className="modal__input"
            type="url"
            name="link"
            placeholder="Image URL"
            required
          />
        </label>
        <fieldset className="modal__fieldset">
          <legend className="modal__legend">Select the weather type:</legend>
          <label className="modal__radio-label">
            <input
              className="modal__radio-input"
              type="radio"
              name="weather"
              value="hot"
              defaultChecked
            />
            <span>Hot</span>
          </label>
          <label className="modal__radio-label">
            <input
              className="modal__radio-input"
              type="radio"
              name="weather"
              value="warm"
            />
            <span>Warm</span>
          </label>
          <label className="modal__radio-label">
            <input
              className="modal__radio-input"
              type="radio"
              name="weather"
              value="cold"
            />
            <span>Cold</span>
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        selectedCard={selectedCard}
        isOpen={activeModal === "preview"}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
