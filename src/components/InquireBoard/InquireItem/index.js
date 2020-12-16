import React from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

const InquireItem = (inquire) => {

  const {
    inquireTitle,
    createdDate,
    displayName,
    textID,
    index
  } = inquire;
  
  if(!inquireTitle) return null;

  return (  
  
    <div className="show-item-wrap">
      <NavLink to={`/inquire/${textID}`}>
        <div className="show-item-header-title">
          <p>
            {index}
          </p>
        </div>

        <div className="show-text">
          <div className="show-title">
            <p className="show-titie-first">{inquireTitle}</p>
            <p>
              {displayName}
            </p>
            <span>
              {moment(createdDate.toDate().toString()).format('MM-DD')}
            </span>
          </div>
                        
        </div>
      </NavLink>  
    </div>
  );
}

export default InquireItem;