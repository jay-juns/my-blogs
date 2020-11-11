import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/utils';
import './styles.scss';

import Logo from './../../assets/logo.png';

// import Modal from './../Modal';


const Header = props => {
  // const [isOpen, setIsOpen] = useState(false) 
  // const [signIsOpen, setSignOpen] = useState(false)
  const { currentUser } = props;
  
  return (
    <div className="header-row-wrapper">
      
      <div className="header-main-control">
        
        <div className="header-left">
          <div className="header-logo">
            <img src={Logo} alt="logo" />
          </div>

          <nav>
            
            <Link to="/">
              홈
            </Link>
          
          
            <Link to="/blog">
              블로그
            </Link>
          
          
            <Link to="/inquire">
              문의사항
            </Link>
            
          </nav>
        </div>
          
        <div className="header-right">
          
          {currentUser && (
            <div className="header-right-item">
              <span onClick={() => auth.signOut()}>
                로그아웃
              </span>
            </div>
          )}

          {!currentUser && (
            
            <div className="header-right-item">
              <Link to="/Login">
                로그인
              </Link>
              <Link to="/Signup">
                회원가입
              </Link>
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