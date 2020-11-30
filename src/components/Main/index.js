import React from 'react';
import './styles.scss';
import SliderMain from '../Slider/sliderMain';

const Main = props => {
  return (
    <div className="main-wrap">
      <SliderMain />
      <div>
        main contents
      </div>
    </div>
  );
};

export default Main;