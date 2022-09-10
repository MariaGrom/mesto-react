import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';



function App() {

    // Переменные состояния попапов
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    // Переменные состояния для попапа открытия карточки 
    const [selectedCard, setSelectedCard] = React.useState({});
    const [openPopupName, setOpenPopupName] = React.useState('');

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

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

    return (
        <>
            <Header />
            <Main
                onCardClick={onCardClick}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
            />
            <PopupWithForm
                name="profile"
                title="Редактировать профиль"
                textsubmit="Сохранить"
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                children={
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
                }
            />

            <PopupWithForm
                name="place"
                title="Новое место"
                textsubmit="Создать"
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                children={
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

            <PopupWithForm
                name="avatar"
                title="Обновить аватар"
                textsubmit="Сохранить"
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                children={
                    <fieldset className="popup__fields">
                        <label className="avatar">
                            <input type="url" name="avatar" id="avatar__input" placeholder="Ссылка на картинку"
                                className="popup__text popup__text_type_avatar popup__input" required />
                            <span className="popup__input-error avatar__input-error"></span>
                        </label>
                    </fieldset>
                }
            />
            <Footer />
        </>
    );
}

export default App;
