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
    <div id="fullMain" className="dashboardLayout">
      <Header {...props} />
      <main className="control-panal">
        <aside className="side-bar">
          <VerticalNav>
            <NavLink 
            to="/dashboard"
            exact 
            activeClassName="active-dashboard"
            className="link-dashboard"
            >
              프로필 정보
            </NavLink>
            <NavLink 
            to="/dashboard/friends"
            activeClassName="active-dashboard"
            className="link-dashboard"
            >
              친구 목록
            </NavLink>
            <span className="sign-out" onClick={() => signOut()}>
              로그아웃
            </span>
          </VerticalNav>
        </aside>
        <section className="content">
          {props.children}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default DashBoardLayout;