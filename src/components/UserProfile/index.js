import React from 'react';
import './styles.scss';

import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserProfile = props => {
  const { currentUser } = props;
  const { userId } = currentUser;

  return (
    <div className="user-profile">
      <div className="user-info-wrapper">
        <span className="user-icon">
          <FontAwesomeIcon className="i" icon={faUser} />
        </span>
        <span className="display-name">
          {userId && userId}
        </span>
      </div>
    </div>
  );
}

export default UserProfile;