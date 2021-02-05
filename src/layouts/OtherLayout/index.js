import React from 'react';
import Header from './../../components/Header';
import Footer from './../../components/Footer';

const MainLayout = props => {
  return (
    <div className="full-wrap">
      <Header {...props} />
      <main className="main">
        <div className="main-box"></div>
        {props.children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;