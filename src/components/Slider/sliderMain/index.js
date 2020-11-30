import React, { useEffect, useState } from "react";
import sliderImage from "../sliderImage";
import Arrows from '../arrows';
import Dots from '../dot';
import Card from '../card';
import './styles.scss';

const len = sliderImage.length - 1;

const SliderMain = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(activeIndex === len ? 0 : activeIndex + 1);
    }, 7000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div className="slider-container">
      <Card activeIndex={activeIndex} />
      <Arrows 
        prevSlide={() => setActiveIndex(activeIndex < 1 ? len : activeIndex - 1)}
        nextSlide={() => setActiveIndex(activeIndex === len ? 0 : activeIndex + 1)}
      />
      <Dots 
        activeIndex={activeIndex}
        onclick={(activeIndex) => setActiveIndex(activeIndex)} 
      />
    </div>
  )
}

export default SliderMain;