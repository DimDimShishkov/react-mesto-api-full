const BASE_URL = "https://api.mesto-shishkov.nomoredomains.icu";

const handleReturn = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const authRegister = (user) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password,
    }),
  }).then((res) => handleReturn(res));
}

export const authCheckIn = (user) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password,
    }),
  }).then((res) => handleReturn(res));
}

export const authTokenCheck = (jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: 'include',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${jwt}`,
    },
  }).then((res) => handleReturn(res));
}