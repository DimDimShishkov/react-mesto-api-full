[![Tests](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-13-sprint.yml) [![Tests](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-14-sprint.yml)

[![Tests](https://github.com/yandex-praktikum/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/DimDimShishkov/express-mesto-gha/actions/workflows/tests-14-sprint.yml)

[![Tests](https://github.com/DimDimShishkov/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/DimDimShishkov/express-mesto-gha/actions/workflows/tests-14-sprint.yml)

[![Tests](https://github.com/DimDimShishkov/react-mesto-api-full/blob/main/backend/.github/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/DimDimShishkov/react-mesto-api-full/blob/main/backend/.github/workflows/tests-14-sprint.yml)

[![Tests for sprint 14](https://github.com/DimDimShishkov/react-mesto-api-full/blob/main/backend/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/DimDimShishkov/react-mesto-api-full/blob/main/backend/actions/workflows/tests-14-sprint.yml)

# Проект Mesto фронтенд + бэкенд

## Настройка бейджей статуса тестов

Перед началом работы над проектом рекомендуется исправить бейджи, отражающие статус прохождения тестов.
Для этого замените разметку бейджей на следующий фрагмент, подставив вместо `${имя_пользователя}` и `${имя_репозитория}` соответствующие значения.

```
[![Tests for sprint 13](https://github.com/DimDimShishkov/react-mesto-api-full/tree/main/backend/.github/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/DimDimShishkov/react-mesto-api-full/tree/main/backend/.github/workflows/tests-13-sprint.yml)

[![Tests for sprint 14](https://github.com/${имя_пользователя}/${имя репозитория}/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/${имя_пользователя}/${имя репозитория}/actions/workflows/tests-14-sprint.yml)
```

### Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки  
`/models` — папка с файлами описания схем пользователя и карточки

Остальные директории вспомогательные, создаются при необходимости разработчиком

### Запросы

- `GET` /users — получить всех пользователей
- `GET` /users/:userId — поучить пользователя по \_id
- `POST` /users — создать пользователя
  - `name` — имя пользователя, строка от 2 до 30 символов, обязательное поле;
  - `about` — информация о пользователе, строка от 2 до 30 символов, обязательное поле;
  - `avatar` — ссылка на аватарку, строка, обязательное поле.
- `PATCH` /users/me — обновить профиль пользователя
- `PATCH` /users/me/avatar — обновить аватар пользователя
- `GET` /cards — получить все карточки
- `POST` /cards — создать карточку
  - `name` — имя карточки, строка от 2 до 30 символов, обязательное поле;
  - `link` — ссылка на картинку, строка, обязательно поле;
  - `owner` — ссылка на модель автора карточки, тип ObjectId, обязательное поле;
  - `likes` — список лайкнувших пост пользователей, массив ObjectId, по умолчанию — пустой массив (поле `default`);
  - `createdAt` — дата создания, тип `Date`, значение по умолчанию `Date.now`.
- `DELETE` /cards/:cardId — удалить карточку по \_id
- `PUT` /cards/:cardId/likes — лайк карточке
- `DELETE` /cards/:cardId/likes — дизлайк карточки

### ❗ Обработка ошибок

- `400` — переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля;
- `401` — токен не верифицирован, требуется авторизация / неправильные почта или пароль.
- `403` — попытка удалить карточку, созданную другим пользователем.
- `404` — карточка или пользователь не найден.
- `409` — при регистрации указана почта существующего пользователя.
- `500` — ошибка по-умолчанию.

### Запуск проекта

`npm run start` — запускает сервер  
`npm run dev` — запускает сервер с hot-reload
