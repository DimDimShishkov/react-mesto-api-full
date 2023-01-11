[![Tests](https://github.com/DimDimShishkov/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/DimDimShishkov/express-mesto-gha/actions/workflows/tests-14-sprint.yml)

# Проектная работа "Mesto" (backend)

![image](https://raw.githubusercontent.com/DimDimShishkov/react-mesto-api-full/main/mesto-api-full.gif)

#### Описание

- Проект "Mesto": интерактивная страница, куда можно добавлять фотографии, удалять их и ставить лайки.
- Фронтенд часть приложения со следующими возможностями: авторизация и регистрация пользователя, операции с карточками и данными пользователя.
- [Ссылка на Backend](https://api.mesto-shishkov.nomoredomains.icu)

#### Технологии

- Express
- MongodDB
- NodeJS
- Mongoose

### Чек-листы:

- [чек-лист для проектной работы 13](https://code.s3.yandex.net/web-developer/checklists-pdf/new-program/checklist_13.pdf) (подготовка бэкенда для приложения)
- [чек-лист для проектной работы 14](https://code.s3.yandex.net/web-developer/checklists-pdf/new-program/checklist_14.pdf)
- [чек-лист для проектной работы 15](https://code.s3.yandex.net/web-developer/checklists-pdf/new-program/checklist_15.pdf) (объединение фронтенд и бэкенд частей приложения)

### Основные директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки  
`/models` — папка с файлами описания схем пользователя и карточки

### Запросы

- `GET` /users — получить всех пользователей
- `GET` /users/:userId — поучить пользователя по id
- `POST` /users — создать пользователя
  - `name` — имя пользователя, строка от 2 до 30 символов (обязательное поле)
  - `about` — информация о пользователе, строка от 2 до 30 символов (обязательное поле)
  - `avatar` — ссылка на аватарку, строка (обязательное поле)
- `PATCH` /users/me — обновить профиль пользователя
- `PATCH` /users/me/avatar — обновить аватар пользователя
- `GET` /cards — получить все карточки
- `POST` /cards — создать карточку
  - `name` — имя карточки, строка от 2 до 30 символов (обязательное поле)
  - `link` — ссылка на картинку, строка (обязательное поле)
  - `owner` — ссылка на модель автора карточки, тип ObjectId (обязательное поле)
  - `likes` — список лайкнувших пост пользователей, массив ObjectId, (значение по умолчанию: пустой массив)
  - `createdAt` — дата создания, тип `Date` (значение по умолчанию: `Date.now`)
- `DELETE` /cards/:cardId — удалить карточку по id
- `PUT` /cards/:cardId/likes — поставить лайк карточке
- `DELETE` /cards/:cardId/likes — убрать лайк с карточки

### Обработка ошибок

- `400` — переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля;
- `401` — токен не верифицирован, требуется авторизация / неправильные почта или пароль.
- `403` — попытка удалить карточку, созданную другим пользователем.
- `404` — карточка или пользователь не найден.
- `409` — при регистрации указана почта существующего пользователя.
- `500` — ошибка по-умолчанию.

## Установка и запуск проекта:

`git clone https://github.com/DimDimShishkov/express-mesto-gha.git` - клонировать репозиторий
`npm install` - установить зависимости
`npm run start` - запустить сервер
`npm run dev` - запустить сервер с hot-reload
