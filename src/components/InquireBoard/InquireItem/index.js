import React from 'react';
import moment from 'moment';

const InquireItem = ({
  inquireTitle,
  createdDate,
  displayName,
  index
}) => {
  
  if(!inquireTitle) return null;

  return (  
  
    <div className="show-item-wrap">
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
    </div>
  );
}

export default InquireItem;