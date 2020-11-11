import React from 'react';
import './styles.scss';
import Slider from '../Slider';

const Main = props => {
  return (
    <div className="main-wrap">
      <Slider />
      <div>
        main contents
      </div>
    </div>
  );
};

export default Main;