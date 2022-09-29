import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/Api';
import { defaultCurrentUser, CurrentUserContext } from '../contexts/CurrentUserContext';



function App() {

    // Переменные состояния попапов
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    // Переменные состояния для попапа открытия карточки 
    const [selectedCard, setSelectedCard] = React.useState({});
    const [isOpenPopupName, setIsOpenPopupName] = React.useState(false);
    // Переменная состояния карточек
    const [cards, setCards] = React.useState([]);


    // Переменная состояния пользователя
    const [currentUser, setCurrentUser] = React.useState(defaultCurrentUser);

    React.useEffect(() => {
        api.getUserInfo()
            .then((data) => {
                setCurrentUser(data)

            })
            .catch((err) => { console.log(err) })
    }, []);

    // Подгружаем данные пользователя и карточки с сервера в функции состояний
    React.useEffect(() => {
        api.getAllCards()
            .then((cards) => {
                setCards(cards);
            })
            .catch((err) => { console.log(err) })
    }, [])

    // Функция постановки лайков карточке
    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => { console.log(err) })
    }

    // Функция удаления карточки
    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then((deletedCard) => {
                setCards((cards) => cards.filter((c) => c._id !== card._id))
            })
            .catch((err) => { console.log(err) })
    }


    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    };

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    };

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    };

    const onCardClick = (card) => {
        setSelectedCard(card);
        setIsOpenPopupName(true);
    };

    const closeAllPopups = () => {
        setIsOpenPopupName(false);
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
    };

    // Изменение данных профиля
    function handleUpdateUser(userData) {
        api.setUserInfo(userData)
            .then((userDataServer) => {
                setCurrentUser(userDataServer)
                closeAllPopups()
            })
            .catch((err) => { console.log(err) })
    };

    // Изменение аватара профиля
    function handleUpdateAvatar(userAvatar) {
        api.setUserAvatar(userAvatar)
            .then((userAvatarServer) => {
                setCurrentUser(userAvatarServer)
                closeAllPopups()
            })
            .catch((err) => { console.log(err) })
    };

    // Добавление новой карточки
    function handleAddPlaceSubmit(card) {
        api.createNewCard(card)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err)
            })

    }


    return (

        <CurrentUserContext.Provider value={currentUser}>
            <Header />
            <Main
                onCardClick={onCardClick}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
            />
            <EditProfilePopup

                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
            />

            <AddPlacePopup

                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}

            />

            <ImagePopup
                card={selectedCard}
                isOpen={isOpenPopupName}
                onClose={() => {
                    closeAllPopups();
                    setSelectedCard({});
                }}
            />

            <PopupWithForm
                name="delete"
                title="Вы уверены?"
                textSubmit="Да"
            />

            <EditAvatarPopup

                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}

            />
            <Footer />
        </CurrentUserContext.Provider>

    );
}

export default App;
