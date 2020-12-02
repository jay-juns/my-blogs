import React from 'react';
import './styles.scss';
import SliderMain from '../Slider/sliderMain';
import MainContent from './mainContent';

const Main = props => {
  
  return (
    <div className="main-wrap">
      <SliderMain />
      <div className="main-contents">
        <MainContent />
      </div>
    </div>
  );
};

export default Main;