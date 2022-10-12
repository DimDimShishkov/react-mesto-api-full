import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function DeleteCardPopup({ isOpen, onClose, onCardDelete, isLoading }) {
  const [buttonText, setButtonText] = React.useState('Удалить');

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isLoading) {
      setButtonText('Удаление...');
    } else {
      setButtonText('Удалить');
    }
    onCardDelete(isOpen)
  }

  return (
    <PopupWithForm
      name="delete-image"
      isOpen={isOpen}
      title="Вы уверены?"
      buttonText={buttonText}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
    </PopupWithForm>
  );
}