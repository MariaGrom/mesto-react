import React from 'react';
import avatar from '../images/kusto.jpg';
import api from '../utils/api';
import Card from './Card'

function Main() {

  // Переменная состояния имя пользователя
  const [userName, setUserName] = React.useState('Жак Ив Кусто');
  // Переменная состояния about пользователя
  const [userDescription, setUserDescription] = React.useState('Исследователь океана');
  // Переменная состояния аватара пользователя  
  const [userAvatar, setUserAvatar] = React.useState(avatar);
  // Переменная состояния карточек
  const [cards, setCards] = React.useState([]);


  // Подгружаем данные пользователя с сервера в значение состояния
  React.useEffect(() => {
    api.getUserInfo()
      .then(data => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
      })
      .catch((err) => { console.log(err) })
  }, [])

  // Забираем карточки с сервера
  React.useEffect(() => {
    api.getAllCards()
      .then((serverCards) => {
        setCards(serverCards);
      })
      .catch((err) => { console.log(err) })
  }, [])

  // Открытие попапа с Аватаром
  function handleEditAvatarClick() {
    const popup = document.querySelector('.popup_type_avatar')
    popup.classList.add('popup_opened')
  }

  // Открытие попапа с Профилем 
  function handleEditProfileClick() {
    const popup = document.querySelector('.popup_type_profile')
    popup.classList.add('popup_opened')
  }

  // Открытие попап с Новым Место
  function handleAddPlaceClick() {
    const popup = document.querySelector('.popup_type_place')
    popup.classList.add('popup_opened')
  }


  return (
    <main>
      <section className="profile">
        <div className="profile__info">
          <div className="profile__photo">
            <img className="profile__avatar" src={userAvatar} alt="Аватар" onClick={handleEditAvatarClick} />
          </div>
          <div className="profile__user">
            <div className="profile__name">
              <h1 className="profile__title">{userName}</h1>
              <button className="profile__edit-button" onClick={handleEditProfileClick}></button>
            </div>
            <p className="profile__subtitle">{userDescription}</p>
          </div>
        </div>
        <button className="profile__add-button" onClick={handleAddPlaceClick}></button>
      </section>
      <section className="elements">
        <ul className="elements__items">
          {cards.map(card => <Card key={card.id}{...card} />)}
        </ul>
      </section>


      <div className="popup popup_type_profile">
        <form className="popup__content popup__form popup__form_profile" noValidate>
          <button type="button" className="popup__close-button"></button>
          <h2 className="popup__title">Редактировать профиль</h2>
          <fieldset className="popup__fields">
            <label className="name">
              <input type="text" name="name" id="name__input" placeholder="Имя"
                className="popup__text popup__text_type_name popup__input" minLength="2" maxLength="40"
                required />
              <span className="popup__input-error name__input-error"></span>
            </label>
            <label className="job">
              <input type="text" name="about" id="job__input" placeholder="О себе"
                className="popup__text popup__text_type_job popup__input" minLength="2" maxLength="200"
                required />
              <span className="popup__input-error job__input-error"></span>
            </label>
          </fieldset>
          <button type="submit" className="popup__submit-button popup__button">Сохранить</button>
        </form>
      </div>

      <div className="popup popup_type_place">
        <form className="popup__content popup__form popup__form_place" noValidate>
          <button type="button" className="popup__close-button"></button>
          <h2 className="popup__title">Новое место</h2>
          <fieldset className="popup__fields">
            <label className="place">
              <input type="text" name="name" id="place__input" placeholder="Название"
                className="popup__text popup__text_type_name popup__input" minLength="2" maxLength="30"
                required />
              <span className="popup__input-error place__input-error"></span>
            </label>
            <label className="link">
              <input type="url" name="link" id="link__input" placeholder="Ссылка на картинку"
                className="popup__text popup__text_type_link popup__input" required />
              <span className="popup__input-error link__input-error"></span>
            </label>
          </fieldset>
          <button name="submit" type="submit" className="popup__submit-button popup__button">Создать</button>
        </form>
      </div>

      <div className="popup popup_type_photo">
        <div className="popup__content-photo">
          <img className="popup__photo" />
          <figcaption className="popup__caption"></figcaption>
          <button type="button" className="popup__close-button"></button>
        </div>
      </div>

      <div className="popup popup_type_delete">
        <form className="popup__content popup__content-delete">
          <button type="button" className="popup__close-button"></button>
          <h2 className="popup__title">Вы уверены?</h2>
          <button className="popup__submit-button popup__button">Да</button>
        </form>
      </div>

      <div className="popup popup_type_avatar">
        <form className="popup__content popup__form popup__content-avatar popup__form_avatar" noValidate>
          <button type="button" className="popup__close-button"></button>
          <h2 className="popup__title">Обновить аватар</h2>
          <fieldset className="popup__fields">
            <label className="avatar">
              <input type="url" name="avatar" id="avatar__input" placeholder="Ссылка на картинку"
                className="popup__text popup__text_type_avatar popup__input" required />
              <span className="popup__input-error avatar__input-error"></span>
            </label>
          </fieldset>
          <button className="popup__submit-button popup__button">Сохранить</button>
        </form>

      </div>
    </main>
  )
}

export default Main