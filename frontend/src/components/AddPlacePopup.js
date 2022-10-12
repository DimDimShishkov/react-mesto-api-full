import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const cardNameRef = React.useRef(null);
  const cardLinkRef = React.useRef(null);

  React.useEffect(() => {
    if (isOpen) {
      cardNameRef.current.value = '';
      cardLinkRef.current.value = '';
    }
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: cardNameRef.current.value,
      link: cardLinkRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="images"
      isOpen={isOpen}
      title="Новое место"
      buttonText={isLoading ? 'Загрузка...' : 'Создать'}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <label className="popup__label popup__label_value_name">
          <input
            required={true}
            minLength={2}
            maxLength={30}
            type="text"
            className="popup__input"
            id="name"
            placeholder="Название"
            ref={cardNameRef}
          />
          <span className="popup__input-error popup__input-error_type_name"></span>
        </label>

        <label className="popup__label popup__label_value_description">
          <input
            required={true}
            type="url"
            className="popup__input"
            id="link"
            placeholder="Ссылка на картинку"
            ref={cardLinkRef}
          />
          <span className="popup__input-error popup__input-error_type_link"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
