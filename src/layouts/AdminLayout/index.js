import React from 'react';
import { NavLink } from 'react-router-dom';
import VerticalNav from './../../components/verticalNav';
import Header from './../../components/Header';
import Footer from './../../components/Footer';

const AdminLayout = props => {

  return (
    <div id="fullMain" className="adminLayout">
      <Header {...props} />
      <main className="control-panal">
        <aside className="side-bar">
          <VerticalNav>
            <NavLink 
            to="/admin"
            exact 
            activeClassName="active-dashboard"
            className="link-dashboard"
            >
              홈
            </NavLink>
            <NavLink 
            to="/dashboard/adminUser"
            activeClassName="active-dashboard"
            className="link-dashboard"
            >
              유저 목록
            </NavLink>
          </VerticalNav>
      
        </aside>
        <section className="content">
          {props.children}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
