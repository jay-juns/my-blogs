import React from 'react';
import { NavLink  } from 'react-router-dom';
import { useSelector } from  'react-redux';
import './styles.scss';

import Logo from './../../assets/logo.png';

// import Modal from './../Modal';

const mapState = (state) => ({
  currentUser: state.user.currentUser
});

const Header = props => {
  // const [isOpen, setIsOpen] = useState(false) 
  // const [signIsOpen, setSignOpen] = useState(false)
  const { currentUser } = useSelector(mapState);

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
            <img src={Logo} alt="logo" />
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
            to="/inquire"
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
      {/* <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        로그인
      </Modal>
      <Modal open={signIsOpen} onClose={() => setSignOpen(false)}>
        회원가입
      </Modal> */}
    </div>
  );
};

Header.defaultProps = {
  currentUser: null
};

export default Header;