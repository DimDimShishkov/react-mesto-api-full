const React = require('react');

export default function ImagePopup(props) {

  function closePopup(evt) {
    if (evt.key === 'Escape' ||
    evt.target.classList.contains('popup_opened') ||
    evt.target.classList.contains('popup__exit-button')) {
      props.onClose()
    }
  }

  return (
    <div className={`popup popup_type_image ${props.card && 'popup_opened'}`} onClick={closePopup}>
      <div className="popup__looking">
        <img
          src={props.card?.link}
          alt={props.card?.name}
          className="popup__image"
        />
        <button className="popup__exit-button" type="button" onClick={props.onClose}></button>
        <h2 className="popup__description">{props.card?.name}</h2>
      </div>
    </div>
  );
}