import React from 'react';
import { Helmet } from "react-helmet";
import SliderMain from '../Slider/sliderMain';
import MainPage from './mainPage';

const Main = props => {
  
  return (
    <>
      <Helmet>
        <title>Home - MyBlogs</title>
      </Helmet>
      <div className="main-wrap">
        
        <SliderMain />
        <div className="main-contents">
          <MainPage />
        </div>
      </div>
    </>
  );
};

export default Main;