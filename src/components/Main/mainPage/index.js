import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './styles.scss';

import MainContents from '../mainContents';
import MainInquire from '../mainInquire';

import { faThLarge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const mapState = ({ contentsData, inquiresData }) => ({
  loading: contentsData.loading,
  loadingInquire: inquiresData.loadingInquire
});

const MainPage = () => {
  const { loading, loadingInquire } = useSelector(mapState);
  const { t } = useTranslation();
  
  return (
    <div className="main-content">
      <div className="main-title-h3">
        <h3>{t('header.blog')}</h3>
      </div>
      
      <div className="main-content--top">
        <div>
          <Link className="main-contents--all-btn" to={'/blog'}>
            <FontAwesomeIcon className="i" icon={faThLarge} />
            <span>{t('others.viewAll')}</span>
          </Link>
        </div>
        { !loading && (
          <div className="main-items" key="dummy-contents-box">
            <div className="main-row">
              <div className="other-main">
                <div className="other-img">
                  
                </div>
                <div className="other-contents">
                    
                </div>
              </div>
              <div className="other-main">
                <div className="other-img">
                  
                </div>
                <div className="other-contents">
                    
                </div>
              </div>
              <div className="other-main">
                <div className="other-img">
                  
                </div>
                <div className="other-contents">
                    
                </div>
              </div>
              <div className="other-main">
                <div className="other-img">
                  
                </div>
                <div className="other-contents">
                    
                </div>
              </div>
            </div>
          </div>   
        )}  
        
        <MainContents />
        
      </div>

      <div className="main-title-h3">
        <h3>{t('header.questions')}</h3>
      </div>

      <div className="main-inquire-wrapper">
        <MainInquire />
        { !loadingInquire && (
          <div className="main-inquire-items-container" key="dummy-inquire-box">
                        
          </div>)}
      </div>

    </div>
  );
};

export default MainPage;