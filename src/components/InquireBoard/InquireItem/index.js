import React from 'react';
import moment from 'moment';

const InquireItem = ({
  inquireTitle,
  inquireDesc,
  createdDate,
  displayName
}) => {
  
  if(!inquireTitle) return null;

  return (  
  
    <div className="show-item-wrap">
      <div>
        <p>
          {displayName}
        </p>
      </div>

      <div className="show-text">
        <div className="show-title">
          <p className="show-titie-first">{inquireTitle}</p>
          <p
            dangerouslySetInnerHTML={{ __html: inquireDesc }}
          />
          <span>
            {moment(createdDate.toDate().toString()).format('YYYY-MM-DD')}
          </span>
        </div>
                      
      </div>  
    </div>
  );
}

export default InquireItem;