import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarRef = React.useRef(null);
  const [buttonText, setButtonText] = React.useState('Сохранить');

  React.useEffect(() => {
    if (isOpen) {
      avatarRef.current.value = '';
    }
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isLoading) {
      setButtonText('Сохранение...');
    } else {
      setButtonText('Сохранить');
    }
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      isOpen={isOpen}
      title="Обновить аватар"
      buttonText={buttonText}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <label className="popup__label popup__label_value_name">
          <input
            required={true}
            type="url"
            className="popup__input"
            id="avatar"
            placeholder="Ссылка на картинку"
            ref={avatarRef}
          />
          <span className="popup__input-error popup__input-error_type_avatar"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
