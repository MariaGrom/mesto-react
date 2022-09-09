import React from 'react';

function PopupWithForm(props) {
  const { name, title, children, textsubmit, isOpen, onClose } = props

  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <form className={`popup__content popup__form popup__form_${name}`}>
        <button type="button" className="popup__close-button" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        {children}
        <button type="submit" className="popup__submit-button popup__button" >{textsubmit}</button>
      </form>
    </div>
  )
}

export default PopupWithForm