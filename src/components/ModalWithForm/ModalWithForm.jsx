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

  //  NEW (optional) secondary action for "or Sign Up" / "or Log In"
  secondaryButtonText,
  onSecondaryClick,
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

  const handleSecondaryClick = () => {
    if (onSecondaryClick) onSecondaryClick();
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

          {/*  Button row: submit on left, optional secondary on right */}
          <div className="modal__actions">
            <button
              className="modal__submit"
              type="submit"
              disabled={isSubmitDisabled}
            >
              {buttonText}
            </button>

            {secondaryButtonText && onSecondaryClick && (
              <button
                className="modal__secondary"
                type="button"
                onClick={handleSecondaryClick}
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
