const { celebrate, Joi } = require('celebrate');

const linkPattern = /^(?:(?:https?|HTTPS?):\/\/)(www\.)?(\w|\W){1,}(\.[a-z]{2,6})((\w|\W){1,})?(#$)?/;

const signupCelebrate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(linkPattern),
    about: Joi.string().min(2).max(30),
  }),
});

const signinCelebrate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const usersIdCelebrate = celebrate({
  params: Joi.object().keys({
    usersId: Joi.string().length(24).hex().required(),
  }),
});

const patchUsersCelebrate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(linkPattern),
    about: Joi.string().min(2).max(30),
  }),
});

const createCardCelebrate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(linkPattern),
  }),
});

const cardsIdCelebrate = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  signupCelebrate,
  signinCelebrate,
  usersIdCelebrate,
  patchUsersCelebrate,
  linkPattern,
  createCardCelebrate,
  cardsIdCelebrate,
};
