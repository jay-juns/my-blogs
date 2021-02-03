import React from 'react';
import { Helmet } from 'react-helmet-async';
import SliderMain from '../Slider/sliderMain';
import MainPage from './mainPage';

const Main = props => {
  
  return (
    <div className="main-wrap">
      <Helmet>
        <title>홈 - My Blogs</title>
      </Helmet>
      <SliderMain />
      <div className="main-contents">
        <MainPage />
      </div>
    </div>
  );
};

export default Main;