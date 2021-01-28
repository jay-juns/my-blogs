import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from  'react-redux';
import './styles.scss';

import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logo from './../../assets/logo.png';

const mapState = (state) => ({
  currentUser: state.user.currentUser
});

const Header = props => {
  const { currentUser } = useSelector(mapState);
  const { inquirePageNumber } = useParams();
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
  const userBgStyle = currentUser && userInfo[0] ? {backgroundColor: '#dddddd'} : { backgroundColor: userColor }

  return (
    <div className={`header-row-wrapper ${mainBg && scrollPosition === 0 ? mainBg : ''}`}>
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

          <nav>
            
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
        </div>
          
        <div className="header-right">
          
          {currentUser && (
            <div className="header-right-item">
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
            
            <div className="header-right-item">
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

        </div>

      </div>
    </div>
  );
};

Header.defaultProps = {
  currentUser: null
};

export default Header;