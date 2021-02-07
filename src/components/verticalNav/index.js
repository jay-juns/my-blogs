import React from 'react';
import { useSelector } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars-2';
import UserProfile from './../UserProfile';
import './styles.scss';

const mapState = ({ user }) => ({
  currentUser: user.currentUser
})

const VerticalNav = ({ children }) => {
  const { currentUser } = useSelector(mapState);

  const configUserProfile = {
    currentUser
  };
  const scrollBarStyle = {
    width: '160px'
  };

  return (
    <div className="vertical-nav">
      <Scrollbars horizontal autoHide={true} style={scrollBarStyle}>
        <UserProfile {...configUserProfile} />
        <div className="menu">
          {children}
        </div>
      </Scrollbars>
    </div>
  );
}

export default VerticalNav;