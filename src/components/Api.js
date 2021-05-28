export class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers
}

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
  })
    .then(result => result.ok ? result.json() : Promise.reject(`Ошибка ${result.status}`))
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
  })
    .then(result => result.ok ? result.json() : Promise.reject(`Ошибка ${result.status}`))
  }
  
  addCard(title, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: title,
        link: link
      })
    })
    .then(result => result.ok ? result.json() : Promise.reject(`Ошибка ${result.status}`))
  };

  editUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(result => result.ok ? result.json() : Promise.reject(`Ошибка ${result.status}`))
    };

    newAvatar(link) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: link
        })
      })
      .then(result => result.ok ? result.json() : Promise.reject(`Ошибка ${result.status}`))
    }
}