import React from 'react';
import { Helmet } from 'react-helmet-async';
import './styles.scss';

const UserFriends = props => {
  const { currentUser } = props;
  const { displayName } = currentUser;

  return (
    <>
    <Helmet>
      <title> 친구목록/{displayName} - My Blogs</title>
    </Helmet>
    <div className="user-friends-list-wrapper">
        <h3>친구목록</h3>
    </div>
    </>
  );
}

export default UserFriends;