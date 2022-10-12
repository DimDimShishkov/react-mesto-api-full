import { CurrentUserContext } from 'contexts/CurrentUserContext';
import React from 'react';
import Card from './Card';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <section className="profile">
        <div className="profile__pic">
          <button className="profile__edit-avatar" type="button" onClick={onEditAvatar}></button>
          <img src={currentUser?.avatar} alt={currentUser?.name} className="profile__avatar" />
        </div>

        <div className="profile__info">
          <div className="profile__main">
            <h1 className="profile__title">{currentUser?.name}</h1>
            <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
          </div>
          <p className="profile__description">{currentUser?.about}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>

      <section className="elements">
        {cards?.map((card) => (
          <Card onCardClick={onCardClick} onCardLike={onCardLike} key={card._id} card={card} onCardDelete={onCardDelete}/>
        ))}
      </section>
    </>
  );
}

export default Main;
