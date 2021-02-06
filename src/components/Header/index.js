import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from  'react-redux';
import './styles.scss';

import useMediaQuery from './../../customHooks/useMediaQuery';

import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logo from './../../assets/logo.png';
import Button from './../Forms/Button';

const mapState = (state) => ({
  currentUser: state.user.currentUser
});

const Header = props => {
  const { currentUser } = useSelector(mapState);
  const { inquirePageNumber } = useParams();
  const [isOpenNav, setIsOpenNav] = useState(false);
  const toggleNav = () => {
    setIsOpenNav(!isOpenNav);
    document.getElementById("fullMain").classList.toggle("hidden");
  };
  const mainBg = props.mainBg;
  const scrollPosition = props.scrollEvent;
  let userColor = [];
  let userInfo = [];
  
  for (let name in currentUser) { 
    if (name.includes('color')) {
      userColor.push(currentUser.color); 
    }
    if (name.includes('userImgUrl')) {
      userInfo.push(currentUser.userImgUrl, currentUser.color); 
    }
  }

  const imgInfo = currentUser && userInfo[0] ? <img src={`${userInfo[0]}`} alt="userLogo" /> : <FontAwesomeIcon className="i" icon={faUser} />;
  const userBgStyle = currentUser && userInfo[0] ? {backgroundColor: 'transparent'} : { backgroundColor: userColor }
  const matches = useMediaQuery("(min-width: 600px)");

  return (
    <>
    <header className={`header-row-wrapper ${mainBg && scrollPosition === 0 ? mainBg : ''}`}>
      <div className="header-main-control">
        
        <div className="header-left">
          <div className="header-logo">
            
            <NavLink
            exact 
            to="/"
            activeClassName="active"
            className="link"
            >
              <img src={Logo} alt="logo" />
            </NavLink>
          </div>
        {
          matches ? (
            <nav key="pc-head-nav">
            
            <NavLink
            exact 
            to="/"
            activeClassName="active"
            className="link"
            >
              홈
            </NavLink>
          
          
            <NavLink 
            to="/blog"
            activeClassName="active"
            className="link"
            >
              블로그
            </NavLink>
          
          
            <NavLink 
            to={`/inquirePage=/${isNaN(inquirePageNumber) ? 1 : Number(inquirePageNumber)}`}
            activeClassName="active"
            className="link"
            >
              문의사항
            </NavLink>
            
          </nav>
          ) : (
            <div className="hide" key="pc-head-hide-nav"></div>
          )
        }
         
        </div>
          
        <div className="header-right">
          
          {currentUser && matches && (
            <div className="header-right-item" key="pc-head-nav-userIcon">
              <NavLink 
              to="/dashboard"
              activeClassName="active"
              className="link user-link"
              style={userBgStyle}
              >
                {imgInfo}
              </NavLink>
            </div>
          )}

          {!currentUser && matches && (
            
            <div className="header-right-item" key="pc-head-nav-unLogin-userIcon">
              <NavLink 
              to="/login"
              activeClassName="active"
              className="link"
              >
                로그인
              </NavLink>
              <NavLink to="/registration"
              activeClassName="active"
              className="link"
              >
                회원가입
              </NavLink>
            </div>  
          )}

          {!matches && (
            <Button className="btn mobile-menu-btn" key="mobile-head-nav-btn" onClick={() => toggleNav()}>
              <FontAwesomeIcon className="i" icon={faBars} />
            </Button>
          )}

        </div>

      </div>
    </header>

    {!matches && (
      <nav className={ !isOpenNav ? 'mobile-nav' : 'mobile-nav open-mobile-nav'} key="mobile-head-nav">
        <button className="closed-btn btn" onClick={() => toggleNav()}>
          <FontAwesomeIcon className="i" icon={faTimes} />
        </button>
        {currentUser && (
        <div className="header-right-item" key="mobile-head-nav-userIcon">
          <NavLink 
          to="/dashboard"
          activeClassName="active"
          className="link user-link"
          style={userBgStyle}
          >
            {imgInfo}
          </NavLink>
        </div>
        )}
        {!currentUser && (
          <div className="header-right-item" key="mobile-head-nav-unLogin-userIcon">
            <NavLink 
            to="/login"
            activeClassName="active"
            className="link"
            >
              로그인
            </NavLink>
            <NavLink to="/registration"
            activeClassName="active"
            className="link"
            >
              회원가입
            </NavLink>
          </div> 
        )}

        <NavLink
          exact 
          to="/"
          activeClassName="active"
          className="link"
          >
            홈
          </NavLink>
        
        
          <NavLink 
          to="/blog"
          activeClassName="active"
          className="link"
          >
            블로그
          </NavLink>
        
        
          <NavLink 
          to={`/inquirePage=/${isNaN(inquirePageNumber) ? 1 : Number(inquirePageNumber)}`}
          activeClassName="active"
          className="link"
          >
            문의사항
          </NavLink>
      </nav>
    )}
    {!matches && (
      <div key="mobile-nav-overlay" className={!isOpenNav ? "mobile-nav-overlay-box" : "mobile-nav-overlay-box open"} onClick={() => toggleNav()}></div>
    )}
    </>
  );
};

Header.defaultProps = {
  currentUser: null
};

export default Header;