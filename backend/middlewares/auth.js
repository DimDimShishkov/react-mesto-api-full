const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  // тут будет вся авторизация
  // достаём авторизационный заголовок
  const authorization = req.cookies.jwt;
  // убеждаемся, что он есть или начинается с Bearer
  /*   if (!authorization || !authorization.startsWith('Bearer ')) { */
  if (!authorization) {
    next(new Unauthorized('Необходима авторизация'));
  }
  // извлечём токен
  /*   const token = authorization.replace('Bearer ', ''); */
  // const token = req.cookies.jwt;
  // верифицируем токен
  let payload;
  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(authorization, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    // отправим ошибку, если не получилось
    next(new Unauthorized('Необходима авторизация'));
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};
