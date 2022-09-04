import React from 'react';

function Card (props) {

  return(
  <li className="elements__item">
    <img className="elements__photo"  src={props.link} alt={props.name}/>
    <div className="elements__description">
      <h2 className="elements__title"> {props.name} </h2>
      <div className="elements__like-container">
        <button className="elements__like"></button>
        <span className="elements__like_counter">{props.likes.length}</span>
      </div>
    </div>
    <button className="elements__delete"></button>
  </li>
  )
}

export default Card