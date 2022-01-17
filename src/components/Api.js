export default class Api {
  constructor(options) {
    // тело конструктора
    this._headers = options.headers;
    this._url = options.baseUrl;
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }

      return Promise.reject(`ошибка статус ${res.status}`)
    })
  };

  // другие методы работы с API
  getUserInfo () {
   return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }

      return Promise.reject(`ошибка статус ${res.status}`)
    })
  };

  updateUserInfo (info) {
   return fetch(`${this._url}/users/me`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
    name: info.name,
    about: info.about
  })
  });
  };

  updateUserAvatar (avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`ошибка аватарки статус: ${res.status}`)
    })
  };




};


