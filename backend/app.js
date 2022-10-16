require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const routes = require('./routes/index');
const errorsHandler = require('./middlewares/errorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const headerHandler = require('./middlewares/headerHandler');

const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000',
  'https://mesto-shishkov.nomoredomains.icu/',
  'http://mesto-shishkov.nomoredomains.icu/',
  'http://localhost:3000',
  'http://localhost:3000/',
  'https://api.mesto-shishkov.nomoredomains.icu',
  'https://api.mesto-shishkov.nomoredomains.icu/users/me',
  'https://api.mesto-shishkov.nomoredomains.icu/cards',
];

const { PORT = 3000 } = process.env; // ошибка запроса на сервер без указания порта
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

const app = express();
app.use(cors({ origin: allowedCors })); // подключаем защиту от запросов с других сайтов
app.use(helmet());

app.use(requestLogger); // подключаем логгер запросов
app.use(limiter); // подключаем rate-limiter
app.use(cookieParser()); // подключаем парсер кук как мидлвэр
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

// удалить после успешного прохождения ревью
// app.use(headerHandler);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes); // обработка всех маршрутов
app.use(errorLogger); // подключаем логгер ошибок

// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(errorsHandler);
app.listen(PORT); // в аргументе было 80
