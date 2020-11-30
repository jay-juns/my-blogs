import React from 'react';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Arrows = props => {
  return (
    <div className="arrows">
      <span className="prev" onClick={props.prevSlide}>
        <FontAwesomeIcon className="i" icon={faAngleLeft} />
      </span>
      <span className="next" onClick={props.nextSlide}>
        <FontAwesomeIcon className="i" icon={faAngleRight} />
      </span>
    </div>
  );
}

export default Arrows;