// src/components/ItemModal/ItemModal.jsx
import { useContext } from "react";
import "./ItemModal.css";

import { CurrentUserContext } from "../../Contexts/CurrentUserContext";

function ItemModal({ selectedCard, isOpen, onClose, onDeleteRequest }) {
  const currentUser = useContext(CurrentUserContext);

  // If closed or no card selected, render nothing
  if (!isOpen || !selectedCard) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const imageSrc = selectedCard.imageUrl || selectedCard.link;

  //  Sprint 14: delete button only for owner (from context)
  const ownerId = selectedCard.owner?._id ?? selectedCard.owner;
  const currentUserId = currentUser?._id;

  const isOwn = Boolean(
    currentUserId && ownerId && String(ownerId) === String(currentUserId),
  );

  return (
    <div
      className={`item-modal ${isOpen ? "item-modal_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="item-modal__content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="item-modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        <img
          src={imageSrc}
          alt={selectedCard.name}
          className="item-modal__image"
        />

        <div className="item-modal__info">
          <div className="item-modal__info-row">
            <p className="item-modal__name">{selectedCard.name}</p>

            {isOwn && (
              <button
                type="button"
                className="item-modal__delete"
                onClick={() => onDeleteRequest(selectedCard)}
              >
                Delete item
              </button>
            )}
          </div>

          <p className="item-modal__weather">Weather: {selectedCard.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
