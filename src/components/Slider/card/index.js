import React from 'react';
import sliderData from '../sliderData';
import { useTranslation } from 'react-i18next';

function Card(props) {
  const { t } = useTranslation();

  return (
    <section>
      {sliderData.map((slide, index) => (
        <div
          key={index}
          className={index === props.activeIndex ? "slides active" : 'inactive'}
        >
          <img className='slide-image' src={slide.urls} alt='img' />
          <h3 className="slide-title">{t(`main.mainSliderTitle${index+1}`)}</h3>
          <p className="slide-text">{t(`main.mainSliderDescription${index+1}`)}</p>
        </div>
      ))}
    </section>
  )
}

export default Card;
