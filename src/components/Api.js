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
    }).then(res => res.json())
  }

  // другие методы работы с API
  getUserInfo () {

  }
};


