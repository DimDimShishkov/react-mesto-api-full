const router = require('express').Router();
const {
  getAllCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { createCardCelebrate, cardsIdCelebrate } = require('../utils/celebrate');

router.get('/', getAllCards);
router.post('/', createCardCelebrate, createCard);
router.delete('/:cardId', cardsIdCelebrate, deleteCard);
router.put('/:cardId/likes', cardsIdCelebrate, likeCard);
router.delete('/:cardId/likes', cardsIdCelebrate, dislikeCard);

module.exports = router;
