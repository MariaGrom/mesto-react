import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';



function App() {

    //   // Открытие попапа с Аватаром
    //   function handleEditAvatarClick() {
    //     const popup = document.querySelector('.popup_type_avatar')
    //     popup.classList.add('popup_opened')
    //   }

    //   // Открытие попапа с Профилем 
    //   function handleEditProfileClick() {
    //     const popup = document.querySelector('.popup_type_profile')
    //     popup.classList.add('popup_opened')
    //   }

    //   // Открытие попап с Новым Место
    //   function handleAddPlaceClick() {
    //     const popup = document.querySelector('.popup_type_place')
    //     popup.classList.add('popup_opened')
    //   }

    // Переменные состояния попапов
    const [ isEditAvatarPopupOpen, setIsEditAvatarPopupOpen ] = React.useState('');
    const [ isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState('');
    const [ isAddPlacePopupOpen, setIsAddPlacePopupOpen] =React.useState('');

    const [selectedCard, setSelectedCard] = React.useState({});
    const [openPopupName, setOpenPopupName] = React.useState('');

    function handleEditAvatarClick () {
        setIsEditAvatarPopupOpen('popup_opened')
    }
    
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen('popup_opened')
    }

    function  handleAddPlaceClick() {
        setIsAddPlacePopupOpen('popup_opened')
    }
    
    const onCardClick = (card) => {
        setSelectedCard(card);
        setOpenPopupName('preview');
    };

    const closeAllPopup = () => {
        setOpenPopupName('');
        setIsEditAvatarPopupOpen('');
        setIsEditProfilePopupOpen('');
        setIsAddPlacePopupOpen('');
        
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
                onClose={()=>{
                    closeAllPopup()
                }}
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
                onClose={()=>{
                    closeAllPopup()
                }}
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
            card ={selectedCard}
            isOpen={openPopupName === 'preview'}
            onClose={()=>{
                closeAllPopup();
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
                onClose={()=>{
                    closeAllPopup()
                }}
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