import { CurrentUserContext } from 'contexts/CurrentUserContext';
import React from 'react';
import PopupWithForm from './PopupWithForm';

/* попап редактирования имени профиля */
export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);
  const [buttonText, setButtonText] = React.useState('Сохранить');

  React.useEffect(() => {
    if (isOpen) {
      setName(currentUser?.name);
      setDescription(currentUser?.about);
    }
  }, [currentUser, isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isLoading) {
      setButtonText('Удаление...');
    } else {
      setButtonText('Сохранить');
    }
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="info"
      isOpen={isOpen}
      title="Редактировать профиль"
      buttonText={buttonText}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <label className="popup__label popup__label_value_name">
          <input
            required={true}
            minLength={2}
            maxLength={40}
            type="text"
            className="popup__input"
            id="title"
            placeholder="Введите имя профиля"
            value={name || ''}
            onChange={handleNameChange}
          />
          <span className="popup__input-error popup__input-error_type_title"></span>
        </label>

        <label className="popup__label popup__label_value_description">
          <input
            required={true}
            minLength={2}
            maxLength={200}
            type="text"
            className="popup__input"
            id="description"
            placeholder="Введите описание профиля"
            value={description || ''}
            onChange={handleDescriptionChange}
          />
          <span className="popup__input-error popup__input-error_type_description"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}
