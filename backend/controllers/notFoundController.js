const NotFound = require('../errors/NotFound');

module.exports.notFoundController = (req, res, next) => {
  next(new NotFound('Запрашиваемый ресурс не найден'));
};
