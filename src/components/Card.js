import React from 'react';

function Card (props) {
const {card, onClick} = props

  return(
  <li className="elements__item">
    <img className="elements__photo"  src={card.link} alt={card.name} onClick={()=>onClick(card)}/>
    <div className="elements__description">
      <h2 className="elements__title"> {card.name} </h2>
      <div className="elements__like-container">
        <button className="elements__like"></button>
        <span className="elements__like_counter">{card.likes.length}</span>
      </div>
    </div>
    <button className="elements__delete"></button>
  </li>
  )
}

export default Card