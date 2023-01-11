import React, { useEffect } from 'react';

export default function PopupWithForm(props) {

  useEffect(() => {
    const closeOnEsc = (evt) => {
      if (evt.key === 'Escape') {
        props.onClose();
      }
    };
    document.addEventListener('keydown', closeOnEsc);
    return () => {
      document.removeEventListener('keydown', closeOnEsc);
    };
  }, []);


  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`} onClick={props.onClose}>
      <div className="popup__container" onClick={evt => evt.stopPropagation()}>
        <h2 className="popup__title">{props.title}</h2>

        <form autoComplete="off" noValidate className="popup__form" name={props.name} onSubmit={props.onSubmit}>
          {props.children}
          <button type="submit" className="popup__submit-button">
            {props.buttonText}
          </button>
        </form>
        <button className="popup__exit-button" type="button" onClick={props.onClose}></button>
      </div>
    </div>
  );
}