import React from 'react';

export default function InfoTooltip(props) {
  function closePopup(evt) {
    if (
      evt.key === 'Escape' ||
      evt.target.classList.contains('popup_opened') ||
      evt.target.classList.contains('popup__exit-button')
    ) {
      props.onClose();
    }
  }

  return (
    <div className={`popup ${props.isOpen && 'popup_opened'}`} onClick={closePopup}>
      <div className="popup__container popup__auth-container">
        <span
          className={`popup__auth-image ${props.auth ? 'popup__auth-image_correct' : 'popup__auth-image_incorrect'}`}
        ></span>
        <h2 className="popup__title popup__auth-title">
          {props.auth ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>

        <button className="popup__exit-button" type="button" onClick={closePopup}></button>
      </div>
    </div>
  );
}
