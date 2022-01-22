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


  renderUserAndCards() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
  }

  updateUserInfo (info) {
   return fetch(`${this._url}/users/me`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
    name: info.name,
    about: info.about})
  })
  .then((res) => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`ошибка аватарки статус: ${res.status}`)
  })
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

  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`ошибка отправки карточки статус: ${res.status}`)
    })
  };

  deleteCard(data) {
    return fetch(`${this._url}/cards/${data._id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`ошибка удаления карточки статус: ${res.status}`)
    })
  }

  setLike(data) {
    return fetch(`${this._url}/cards/${data._id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`ошибка постановки лайка карточки статус: ${res.status}`)
    })
  };

  deleteLike(data) {
    return fetch(`${this._url}/cards/${data._id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`ошибка постановки лайка карточки статус: ${res.status}`)
    })
  }


};


