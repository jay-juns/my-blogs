import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const InquireItem = (inquireText) => {
  const {
    inquireTitle,
    displayName,
    documentID,
    createdDate,
    index
  } = inquireText;
  
  if(!inquireTitle || !displayName || !documentID) return null;

  const toDate = createdDate.toDate().toString();

  return (  
  
    <div className="show-item-wrap">
      <Link to={`/inquireText/${documentID}`}>
        <div className="show-item-header-title">
          <p>{index}</p>
        </div>

        <div className="show-text">
          <div className="show-title">
            <p className="show-titie-first">
              {inquireTitle}
            </p>
            <p>
              {displayName}
            </p>
            <span>
              {moment(toDate).format('MM-DD')}
            </span>
          </div>
                        
        </div>
      </Link>
    </div>
  );
}

export default InquireItem;