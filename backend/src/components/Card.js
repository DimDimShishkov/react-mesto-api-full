import { CurrentUserContext } from 'contexts/CurrentUserContext';
import React from 'react';

function Card({ onCardClick, onCardLike, card, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const {
    link,
    name,
    _id,
    owner: { _id: ownerId },
  } = card;
  const likes = card.likes.map((item) => item._id);

  function handleShowLikes() {
    if (likes.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = ownerId === currentUser?._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = likes.includes(currentUser?._id);

    function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(_id, isLiked);
  }

  function handleDeleteClick() {
    onCardDelete(_id);
  }

  return (
    <article className="element">
      <img src={link} alt={name} className="element__image" onClick={handleClick} />
      <div className="element__title">
        <h2 className="element__text">{name}</h2>
        <div className="element__item">
          <button
            className={`element__like ${isLiked ? 'element__like_active' : ''}`}
            onClick={handleLikeClick}
            type="button"
          ></button>
          <p className={`element__likes ${handleShowLikes() ? 'element__likes_active' : ''}`}>{likes.length}</p>
        </div>
      </div>
      <button className={isOwn ? 'element__remove' : 'element__remove_disabled '} type="button" onClick={handleDeleteClick}></button>
    </article>
  );
}

export default Card;
