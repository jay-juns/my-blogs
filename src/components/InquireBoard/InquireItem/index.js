import React from 'react';
import moment from 'moment';

const InquireItem = ({
  inquireTitle,
  createdDate,
  index
}) => {
  
  if(!inquireTitle) return null;

  return (  
  
    <div className="show-item-wrap">
      <div>
        <p>
          {index}
        </p>
      </div>

      <div className="show-text">
        <div className="show-title">
          <p className="show-titie-first">{inquireTitle}</p>
          <p>
            
          </p>
          <span>
            {moment(createdDate.toDate().toString()).format('YYYY-MM-DD')}
          </span>
        </div>
                      
      </div>  
    </div>
  );
}

export default InquireItem;