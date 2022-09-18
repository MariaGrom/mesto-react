import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import api from '../utils/api';
import { defaultCurrentUser, CurrentUserContext } from '../contexts/CurrentUserContext';



function App() {

    // Переменные состояния попапов
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    // Переменные состояния для попапа открытия карточки 
    const [selectedCard, setSelectedCard] = React.useState({});
    const [openPopupName, setOpenPopupName] = React.useState('');

    // Переменная состояния пользователя
    const [currentUser, setCurrentUser] = React.useState(defaultCurrentUser);

    React.useEffect(() => {
        api.getUserInfo()
            .then((data) => {
                setCurrentUser(data)

            })
            .catch((err) => { console.log(err) })
    }, []);

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
        setOpenPopupName('preview');
    };

    const closeAllPopups = () => {
        setOpenPopupName(false);
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
        api.setUseravatar(userAvatar)
            .then((userAvatarServer) => {
                setCurrentUser(userAvatarServer)
                closeAllPopups()
            })
            .catch((err) => { console.log(err) })
    };




    return (

        <CurrentUserContext.Provider value={currentUser}>
            <Header />
            <Main
                onCardClick={onCardClick}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
            />
            <EditProfilePopup

                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
            />

            <PopupWithForm
                name="place"
                title="Новое место"
                textsubmit="Создать"
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                //onUpdateUser={handleUpdateUser}
                children={
                    <fieldset className="popup__fields">
                        <label className="place">
                            <input type="text"
                                name="name"
                                id="place__input"
                                placeholder="Название"
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
                }
            />

            <ImagePopup
                card={selectedCard}
                isOpen={openPopupName === 'preview'}
                onClose={() => {
                    closeAllPopups();
                    setSelectedCard({});
                }}
            />

            <PopupWithForm
                name="delete"
                title="Вы уверены?"
                textsubmit="Да"
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
