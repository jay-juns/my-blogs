import React from 'react';
import './styles.scss';

const UserFriends = props => {
  const { currentUser } = props;
  console.log(currentUser);

  return (
    <div className="user-friends-list-wrapper">
        <h3>친구목록</h3>
    </div>
  );
}

export default UserFriends;