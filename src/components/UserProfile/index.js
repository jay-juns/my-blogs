import React from 'react';
import './styles.scss';

import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserProfile = props => {
  const { currentUser } = props;
  const { displayName, color, userImgUrl } = currentUser;
  const userStyleColor = userImgUrl ? {
    backgroundColor: 'transparent',
    position: 'relative',
    width: '35px',
    height: '35px',
    overflow: 'hidden'
  } : {backgroundColor: color};
  const userLogo = userImgUrl ? <img src={`${userImgUrl}`} alt="userLogo" /> : <FontAwesomeIcon className="i" icon={faUser} />;

  return (
    <div className="user-profile">
      <div className="user-info-wrapper">
        <span className="user-icon" style={userStyleColor}>
          {userLogo}
        </span>
        <span className="display-name">
          {displayName && displayName}
        </span>
      </div>
    </div>
  );
}

export default UserProfile;