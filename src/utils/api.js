class Api {
  constructor({url, headers}) 
  {
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

  // 3. Редактирование профиля
  updateUserInfo({ name, about }) {
    return fetch(`${this._url}/users/me`,
      {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({ name, about })
      })
      .then(this._handleResponce)
  }

  // 4. Добавление новой карточки 
  createNewCard({ name, link }) {
    return fetch(`${this._url}/cards`,
      {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({ name, link })
      })
      .then(this._handleResponce)
  }


  // 5. Удаление карточки
  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`,
      {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(this._handleResponce)
  }


  // 6. Постановка лайка
  setLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`,
      {
        method: 'PUT',
        headers: this._headers,
      })
      .then(this._handleResponce)
  }

  // 7. Удаление лайка
  deleteLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`,
      {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(this._handleResponce)
  }

  // 8. Обновление аватара
  updateUseravatar({ avatar }) {
    return fetch(`${this._url}/users/me/avatar`,
      {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({ avatar })
      })
      .then(this._handleResponce)
  }

}

const api = new Api ({
  url: "https://mesto.nomoreparties.co/v1/cohort-48",
  headers: {
    "content-type": "application/json",
    "authorization": "6759dab4-c3f2-490f-91ba-dce1213f320e",
  }
})

export default api;