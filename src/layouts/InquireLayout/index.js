import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const InquireLayout = props => {
  return (
    <div id="fullMain" className="full-wrap">
      <Header {...props} />
      <main className="main">
        <div className="main-box"></div>
        {props.children}
      </main>
      <Footer />
    </div>
  );
};

export default InquireLayout;