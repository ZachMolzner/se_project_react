// src/components/AddItemModal/AddItemModal.jsx
import { useEffect } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const AddItemModal = ({ isOpen, onClose, onAddItem }) => {
  // ✅ use the real API from your hook
  const { values, handleChange, resetForm } = useForm({
    name: "",
    imageUrl: "",
    weather: "hot",
  });

  // ✅ When the modal opens, reset the form to defaults
  useEffect(() => {
    if (isOpen) {
      resetForm({
        name: "",
        imageUrl: "",
        weather: "hot",
      });
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      name: values.name,
      imageUrl: values.imageUrl,
      weather: values.weather,
    };

    // Let App handle API + closing the modal
    onAddItem(newItem);

    // Optional: if you ALSO want to clear immediately on submit:
    // resetForm({ name: "", imageUrl: "", weather: "hot" });
  };

  return (
    <ModalWithForm
      name="add-garment"
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name
        <input
          className="modal__input"
          type="text"
          name="name"
          placeholder="Name"
          required
          value={values.name}
          onChange={handleChange}
        />
      </label>

      <label className="modal__label">
        Image
        <input
          className="modal__input"
          type="url"
          name="imageUrl"
          placeholder="Image URL"
          required
          value={values.imageUrl}
          onChange={handleChange}
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
            checked={values.weather === "hot"}
            onChange={handleChange}
          />
          <span>Hot</span>
        </label>

        <label className="modal__radio-label">
          <input
            className="modal__radio-input"
            type="radio"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          <span>Warm</span>
        </label>

        <label className="modal__radio-label">
          <input
            className="modal__radio-input"
            type="radio"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          <span>Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
