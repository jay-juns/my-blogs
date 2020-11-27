import React from 'react';
import './styles.scss';

function Card(props) {
  return (
    <div className="card">
      <img src={props.card_img} alt="item"/>
    </div>
  )
}

export default Card;
