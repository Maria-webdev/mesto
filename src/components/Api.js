export class Api { 
  constructor({baseUrl, headers}) { 
    this._baseUrl = baseUrl; 
    this._headers = headers 
  } 

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
  } 

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
  } 
 
  getInitialCards() { 
    return fetch(`${this._baseUrl}/cards`, { 
      headers: this._headers 
  }) 

    .then((res) => this. _getResponseData(res));
  } 
 
  getUserInfo() { 
    return fetch(`${this._baseUrl}/users/me`, { 
      headers: this._headers 
  }) 
  .then((res) => this. _getResponseData(res));
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
    .then((res) => this. _getResponseData(res));
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
    .then((res) => this. _getResponseData(res));
    }; 
 
    newAvatar(link) { 
      return fetch(`${this._baseUrl}/users/me/avatar`, { 
        method: 'PATCH', 
        headers: this._headers, 
        body: JSON.stringify({ 
          avatar: link 
        }) 
      }) 
      .then((res) => this. _getResponseData(res));
    } 
 
    handleLikeCard(cardId) { 
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, { 
        method: 'PUT', 
        headers: this._headers, 
      }) 
      .then((res) => this. _getResponseData(res));
    } 
 
    handleDeleteLike(cardId) { 
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, { 
        method: 'DELETE', 
        headers: this._headers, 
      }) 
      .then((res) => this. _getResponseData(res));
    } 
 
    deleteCard(cardId) { 
      return fetch(`${this._baseUrl}/cards/${cardId}`, { 
        method: 'DELETE', 
        headers: this._headers, 
      }) 
      .then((res) => this. _getResponseData(res));
    } 
} 