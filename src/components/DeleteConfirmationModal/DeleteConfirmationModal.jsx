// src/components/DeleteConfirmationModal/DeleteConfirmationModal.jsx
import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={`confirm-modal ${isOpen ? "confirm-modal_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div
        className="confirm-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="confirm-modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        <p className="confirm-modal__text">
          Are you sure you want to delete this item?
          <br />
          <span className="confirm-modal__subtext">
            This action is irreversible.
          </span>
        </p>

        <button
          type="button"
          className="confirm-modal__delete"
          onClick={onConfirm}
        >
          Yes, delete it
        </button>

        <button
          type="button"
          className="confirm-modal__cancel"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
