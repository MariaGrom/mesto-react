import React from 'react';

function PopupWithForm (props) {


  return(
    <div className={`popup popup_type_${props.name}`}>
    <form className="popup__content popup__form popup__form_profile" noValidate>
      <button type="button" className="popup__close-button"></button>
      <h2 className="popup__title">{props.title}</h2>      
      <button type="submit" className="popup__submit-button popup__button">Сохранить</button>
    </form>
  </div>
  )
}

export default PopupWithForm