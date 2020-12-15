import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const InquireItem = ({
  inquireTitle,
  createdDate,
  displayName,
  textID,
  index
}) => {
  
  if(!inquireTitle) return null;

  return (  
  
    <div className="show-item-wrap">
      <Link to={`/inquire/${textID}`}>
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
      </Link>  
    </div>
  );
}

export default InquireItem;