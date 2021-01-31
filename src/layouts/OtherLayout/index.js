import React from 'react';
import Header from './../../components/Header';
import Footer from './../../components/Footer';

const MainLayout = props => {
  return (
    <div className="full-wrap">
      <Header {...props} />
      <div className="main">
        <div className="main-box"></div>
        {props.children}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;