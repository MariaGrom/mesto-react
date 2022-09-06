import React from 'react';

function PopupWithForm (props) {
const {name, title, children, textsubmit, isOpen, onClose} = props

  return(
    <div className={isOpen ? console.log('popup popup_type_${name} popup_opened') : console.log('popup popup_type_${name}')}>
    <form className={`popup__content popup__form popup__form_${name}`} noValidate>
      <button type="button" className="popup__close-button" onClick={()=>{}}></button>
      <h2 className="popup__title">{title}</h2>     
      {children} 
      <button type="submit" className="popup__submit-button popup__button" onClick={()=>{}}>{textsubmit}</button>
    </form>
  </div>
  )
}

export default PopupWithForm