const Card = require('../models/cards');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');
const ValidationError = require('../errors/ValidationError');

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(err.message));
      }
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId).orFail(new NotFound(
    `Карточка c ID = ${req.params.cardId} не найдена`,
  ))
    .then((user) => {
      if (user.owner.toString() === req.user._id) {
        Card.findByIdAndRemove(req.params.cardId)
          .then((item) => res.send(item))
          .catch(next);
      } else {
        next(new Forbidden('Карточка создана другим пользователем'));
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  ).orFail(new NotFound(
    `Карточка c ID = ${req.params.cardId} не найдена`,
  ))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  ).orFail(new NotFound(
    `Карточка c ID = ${req.params.cardId} не найдена`,
  ))
    .then((user) => res.send(user))
    .catch(next);
};
