import React from 'react';
import avatar from '../images/kusto.jpg';
import api from '../utils/api';
import Card from './Card'

function Main(props){
  const {onEditAvatar, onCardClick}=props

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

  return (
    <main>
      <section className="profile">
        <div className="profile__info">
          <div className="profile__photo" onClick={onEditAvatar}>
            <img className="profile__avatar" src={userAvatar} alt="Аватар"  />
          </div>
          <div className="profile__user">
            <div className="profile__name">
              <h1 className="profile__title">{userName}</h1>
              <button className="profile__edit-button"></button>
            </div>
            <p className="profile__subtitle">{userDescription}</p>
          </div>
        </div>
        <button className="profile__add-button"></button>
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