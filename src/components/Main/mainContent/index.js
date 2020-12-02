import React from 'react';
import './styles.scss';
import MainItem from './../mainItem';


const MainContent = ({ }) => {
  
  return (
    <div className="main-content">
      <div>
        <h3>최근 게시글</h3>
      </div>
      
      <div>
        <MainItem />
      </div>

    </div>
  );
};

export default MainContent;