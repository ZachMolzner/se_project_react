import "./ItemModal.css";

function ItemModal({ selectedCard, isOpen, onClose }) {
  if (!isOpen || !selectedCard) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={`item-modal ${isOpen ? "item-modal_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="item-modal__content">
        <button
          type="button"
          className="item-modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        <img
          src={selectedCard.link}
          alt={selectedCard.name}
          className="item-modal__image"
        />

        <div className="item-modal__info">
          <p className="item-modal__name">{selectedCard.name}</p>
          <p className="item-modal__weather">Weather: {selectedCard.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
