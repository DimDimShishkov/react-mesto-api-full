class Api {
  constructor(configApi) {
    this._url = configApi.url;
    this._headers = configApi.headers;
  }

  // обработчик ответа сервера
  _handleReturn(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Редактирование профиля
  handleUploadProfileInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._handleReturn(res));
  }

  // Редактирование аватара профиля
  handleUploadProfileAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._handleReturn(res));
  }

  // Загрузка информации о пользователе с сервера
  handleDownloadProfileInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    }).then((res) => this._handleReturn(res));
  }

  // Загрузка карточек с сервера
  handleDownloadCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    }).then((res) => this._handleReturn(res));
  }

  // Загрузка карточек на сервер
  handleUploadCard(item) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        link: item.link,
      }),
    }).then((res) => this._handleReturn(res));
  }

  // Удаление картинки
  handleDeleteServerCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    }).then((res) => this._handleReturn(res));
  }

  // Добавление или удаление лайков на картинку
  handleCardLikes(cardId, method) {
    if (method) {
      this._method = 'PUT';
    } else {
      this._method = 'DELETE';
    }
    return fetch(`${this._url}/cards/${cardId}/likes `, {
      method: this._method,
      credentials: 'include',
      headers: this._headers,
    }).then((res) => {
      return this._handleReturn(res);
    });
  }
}

export const api = new Api({
  // url: "http://localhost",
  url: 'https://api.mesto-shishkov.nomoredomains.icu',
  headers: {
    authorization: '02d68e11-bd2f-4860-a475-a40f4f8a5368',
    'Content-Type': 'application/json',
  },
});
