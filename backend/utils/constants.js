const crypto = require('crypto'); // экспортируем crypto

const randomString = crypto
  .randomBytes(16) // сгенерируем случайную последовательность 16 байт (128 бит)
  .toString('hex'); // приведём её к строке

const BAD_DATA_CODE = 400;
const BAD_DATA_MESSAGE = 'Переданы некорректные данные';
const BAD_AUTH_CODE = 401;
const BAD_AUTH_MESSAGE = 'Ошибка авторизации';
const NOT_FOUND_CODE = 404;
const NOT_FOUND_ROUTE_MESSAGE = 'Запрашиваемый ресурс не найден';
const SERVER_ERROR_CODE = 500;
const SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка';
// переписать под email
const emailPattern = '/^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/';

module.exports = {
  BAD_DATA_CODE,
  BAD_DATA_MESSAGE,
  BAD_AUTH_CODE,
  BAD_AUTH_MESSAGE,
  NOT_FOUND_CODE,
  NOT_FOUND_ROUTE_MESSAGE,
  SERVER_ERROR_CODE,
  SERVER_ERROR_MESSAGE,
  emailPattern,
  randomString,
};
