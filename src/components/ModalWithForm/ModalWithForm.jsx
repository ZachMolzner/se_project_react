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
    if (e.target.classList.contains("modal")) {
      onClose();
    }
  };

  return (
    <div
      className={`modal ${isOpen ? "modal_is-opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" type="button" onClick={onClose}>
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
