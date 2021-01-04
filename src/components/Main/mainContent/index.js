import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import MainItem from './../mainItem';
import MainInquire from './../mainInquire';

import { faThLarge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MainContent = ({ }) => {
  
  return (
    <div className="main-content">
      <div className="main-title-h3">
        <h3>블로그</h3>
      </div>
      
      <div className="main-content--top">
        <div>
          <Link className="main-contents--all-btn" to={'/blog'}>
            <FontAwesomeIcon className="i" icon={faThLarge} />
            <span>모두 보기</span>
          </Link>
        </div>
        <MainItem />
      </div>

      <div className="main-title-h3">
        <h3>문의사항</h3>
      </div>

      <div>
        <MainInquire />
      </div>

    </div>
  );
};

export default MainContent;