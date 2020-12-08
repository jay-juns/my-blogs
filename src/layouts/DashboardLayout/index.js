import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutUserStart } from '../../redux/User/user.actions';

import Header from './../../components/Header';
import Footer from './../../components/Footer';
import VerticalNav from './../../components/verticalNav'

const DashBoardLayout = props => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(signOutUserStart());
  }
  
  return (
    <div className="dashboardLayout">
      <Header {...props} />
      <div className="control-panal">
        <div className="side-bar">
          <VerticalNav>
            <NavLink 
            to="/dashboard"
            exact 
            activeClassName="active-dashboard"
            className="link-dashboard"
            >
              프로필 정보
            </NavLink>
            <span className="sign-out" onClick={() => signOut()}>
              로그아웃
            </span>
          </VerticalNav>
        </div>
        <div className="content">
          {props.children}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DashBoardLayout;