class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }


  _handleResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  // 1. Загрузка информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._url}/users/me`, { headers: this._headers })
      .then(this._handleResponce)
  }

  // 2. Загрузка карточек с сервера
  getAllCards() {
    return fetch(`${this._url}/cards`, { headers: this._headers })
      .then(this._handleResponce)
  }

  // 3. Постановка лайка
  changeLikeCardStatus (id, isLiked) {
    if (isLiked) {
      fetch(`${this._url}/cards/${id}/likes`,
        {
          method: 'PUT',
          headers: this._headers,
        })
        .then(console.log('успех - поставил лайк'))
    } else {
      fetch(`${this._url}/cards/${id}/likes`,
        {
          method: 'DELETE',
          headers: this._headers,
        })
        .then(console.log('успех - снял лайк'))
    }
  }


}

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-48",
  headers: {
    "content-type": "application/json",
    "authorization": "6759dab4-c3f2-490f-91ba-dce1213f320e",
  }
})

export default api;