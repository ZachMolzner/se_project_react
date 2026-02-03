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
  isSubmitDisabled = false,
}) {
  const handleOverlayClick = (e) => {
    // click on dark background closes modal
    if (e.target.classList.contains("modal")) {
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
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
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        <h3 className="modal__title">{title}</h3>

        <form className="modal__form" name={name} onSubmit={handleSubmit}>
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
