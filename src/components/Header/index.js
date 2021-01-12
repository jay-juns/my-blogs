import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from  'react-redux';
import './styles.scss';

import Logo from './../../assets/logo.png';

const mapState = (state) => ({
  currentUser: state.user.currentUser
});

const Header = props => {
  const { currentUser } = useSelector(mapState);
  const { inquirePageNumber } = useParams();

  let userInfo = [];
  
  for (let name in currentUser) { 
    if (name.includes('displayName')) {
      userInfo.push(currentUser.displayName); 
    }
  }

  userInfo = `"${userInfo[0]}"`;
  const userF = userInfo.substr(1, 1); 
  
  return (
    <div className="header-row-wrapper">
      
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
              >
                {userF}
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