import React, { useEffect } from 'react';

export default function InfoTooltip({ isOpen, auth, onClose }) {
  useEffect(() => {
    function closeOnEsc(evt) {
      if (evt.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', closeOnEsc);
    return () => {
      document.removeEventListener('keydown', closeOnEsc);
    };
  }, []);

  return (
    <div className={`popup ${isOpen && 'popup_opened'}`} onClick={() => onClose()}>
      <div className="popup__container popup__auth-container" onClick={(e) => e.stopPropagation()}>
        <span
          className={`popup__auth-image ${auth ? 'popup__auth-image_correct' : 'popup__auth-image_incorrect'}`}
        ></span>
        <h2 className="popup__title popup__auth-title">
          {auth ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>

        <button className="popup__exit-button" type="button" onClick={() => onClose()}></button>
      </div>
    </div>
  );
}
