import React from 'react';
import SliderMain from '../Slider/sliderMain';
import MainPage from './mainPage';

const Main = props => {
  
  return (
    <div className="main-wrap">
      
      <SliderMain />
      <div className="main-contents">
        <MainPage />
      </div>
    </div>
  );
};

export default Main;