import React from 'react';
import api from '../utils/api';
import Card from './Card'
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main(props) {
  const { onEditAvatar, onEditProfile, onAddPlace, onCardClick } = props

  // Подписываемся на контекст CurrentUserContext
const currentUser = React.useContext(CurrentUserContext);

  // Переменная состояния карточек
  const [cards, setCards] = React.useState([]);


  // Подгружаем данные пользователя и карточки с сервера в функции состояний
  React.useEffect(() => {
    api.getAllCards()
      .then((serverCards) => {
        setCards(serverCards);
      })
      .catch((err) => { console.log(err) })
  }, [])

  return (
    <main>
      <section className="profile">
        <div className="profile__info">
          <div className="profile__photo" onClick={onEditAvatar}>
            <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
          </div>
          <div className="profile__user">
            <div className="profile__name">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button className="profile__edit-button" onClick={onEditProfile}></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-button" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements__items">
          {cards.map(card => (<Card key={card._id} card={card} onClick={onCardClick} />))}
        </ul>
      </section>


    </main >
  )
}

export default Main