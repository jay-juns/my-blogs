import React, { useState, useEffect, useRef } from 'react';

import Header from './../../components/Header';
import Footer from './../../components/Footer';

const MainLayout = props => {
  const mainBg = 'main-bg';
  const [scrollTop, setScrollTop] = useState(document.body.scrollTop);

  // create element ref
  const innerRef = useRef(null);

  useEffect(() => {
    const scrollEvent = innerRef.current;
    scrollEvent.addEventListener("scroll", handleOnScroll);
    return () => {
      // unsubscribe event
      scrollEvent.removeEventListener("scroll", handleOnScroll);
    };
  }, []);

  const handleOnScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  }


  return (
    <div className="full-wrap" ref={innerRef}>     
      <Header {...props} mainBg={mainBg} scrollEvent={scrollTop}/>
      <main className="main">        
        {props.children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;