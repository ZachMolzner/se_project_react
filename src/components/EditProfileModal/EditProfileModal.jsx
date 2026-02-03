// src/components/EditProfileModal/EditProfileModal.jsx
import { useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";

function EditProfileModal({ isOpen, onClose, onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, resetForm } = useForm({
    name: "",
    avatar: "",
  });

  useEffect(() => {
    if (isOpen) {
      resetForm({
        name: currentUser?.name || "",
        avatar: currentUser?.avatar || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, currentUser]);

  const isSubmitDisabled = !values.name.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfile(values);
  };

  return (
    <ModalWithForm
      name="edit-profile"
      title="Change profile data"
      buttonText="Save"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={isSubmitDisabled}
    >
      <label className="modal__label">
        Name
        <input
          className="modal__input"
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Your name"
          required
        />
      </label>

      <label className="modal__label">
        Avatar URL
        <input
          className="modal__input"
          type="url"
          name="avatar"
          value={values.avatar}
          onChange={handleChange}
          placeholder="https://example.com/avatar.png"
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
