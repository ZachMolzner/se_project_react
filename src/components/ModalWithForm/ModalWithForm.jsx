// src/components/ModalWithForm/ModalWithForm.jsx
import "./ModalWithForm.css";

function ModalWithForm({
  name,
  title,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  children,
  isSubmitDisabled,
}) {
  const handleOverlayClick = (e) => {
    // click on dark background closes modal
    if (e.target.classList.contains("modal")) {
      onClose();
    }
  };

  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal_is-opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__content">
        <button
          className="modal__close"
          type="button"
          onClick={onClose} // ⬅ X button uses SAME handler
        >
          ×
        </button>
        <h3 className="modal__title">{title}</h3>

        <form className="modal__form" name={name} onSubmit={onSubmit}>
          {children}
          <button
            className="modal__submit"
            type="submit"
            disabled={isSubmitDisabled}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
