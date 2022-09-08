import React from 'react';
import avatar from '../images/kusto.jpg';
import api from '../utils/api';
import Card from './Card'

function Main(props) {
  const { onEditAvatar, onEditProfile, onAddPlace, onCardClick } = props

  // Задаем переменные состояния пользователя 
  const [userName, setUserName] = React.useState('Жак Ив Кусто');
  const [userDescription, setUserDescription] = React.useState('Исследователь океана');
  const [userAvatar, setUserAvatar] = React.useState(avatar);
  // Переменная состояния карточек
  const [cards, setCards] = React.useState([]);


  // Подгружаем данные пользователя и карточки с сервера в функции состояний
  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getAllCards()])
      .then(([data, serverCards]) => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
        setCards(serverCards);
      })
      .catch((err) => { console.log(err) })
  }, [])

  return (
    <main>
      <section className="profile">
        <div className="profile__info">
          <div className="profile__photo" onClick={onEditAvatar}>
            <img className="profile__avatar" src={userAvatar} alt="Аватар" />
          </div>
          <div className="profile__user">
            <div className="profile__name">
              <h1 className="profile__title">{userName}</h1>
              <button className="profile__edit-button" onClick={onEditProfile}></button>
            </div>
            <p className="profile__subtitle">{userDescription}</p>
          </div>
        </div>
        <button className="profile__add-button" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements__items">
          {cards.map(card => <Card key={card._id} card={card} onClick={onCardClick} />)}
        </ul>
      </section>


    </main >
  )
}

export default Main