import React, { useEffect } from 'react';

export default function ImagePopup({ card, onClose }) {
  useEffect(() => {
    function closeOnEsc(evt) {
      if (evt.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', closeOnEsc);
    return () => {
      document.removeEventListener('keydown', closeOnEsc);
    };
  }, []);

  return (
    <div className={`popup popup_type_image ${card && 'popup_opened'}`} onClick={() => onClose()}>
      <div className="popup__looking" onClick={(e) => e.stopPropagation()}>
        <img src={card?.link} alt={card?.name} className="popup__image" />
        <button className="popup__exit-button" type="button" onClick={() => onClose()}></button>
        <h2 className="popup__description">{card?.name}</h2>
      </div>
    </div>
  );
}
