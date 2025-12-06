// src/components/AddItemModal/AddItemModal.jsx
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const AddItemModal = ({ isOpen, onClose, onAddItem }) => {
  const { values, handleChange, setValues } = useForm({
    name: "",
    imageUrl: "",
    weather: "hot",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      name: values.name,
      imageUrl: values.imageUrl,
      weather: values.weather,
    };

    // let App handle API + state update;
    // send reset callback so App can clear the form after success
    onAddItem(newItem, () =>
      setValues({ name: "", imageUrl: "", weather: "hot" })
    );
  };

  return (
    <ModalWithForm
      name="add-garment"
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose} // ⬅ important!
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
