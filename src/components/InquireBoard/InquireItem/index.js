import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const InquireItem = (inquireText) => {
  const {
    inquireTitle,
    displayName,
    documentID,
    inquireTag,
    classBg,
    createdDate,
    comLengResult
  } = inquireText;

  let comMsg = comLengResult.filter((lengID) => {
    if(lengID === documentID) {
      return true;
    }
    return false;
  });

  const comLeng = comMsg.length === 0 ? '' : `[${comMsg.length}]`;

  if(!inquireTitle || !displayName || !documentID) return null;  

  const toDate = createdDate.toDate().toString();

  return (  
  
    <div className="show-item-wrap" >
      <Link to={`/inquireText/${documentID}`}>
        <div className="show-item-header-title">
          <p>0</p>
        </div>

        <div className="show-text">
          <div className="show-title">
            <p className={`${classBg} show-tag`}>
              {inquireTag}
            </p>
            <p className="show-titie-first">
              <span>{inquireTitle}</span> 
              <span className="comment-length">{comLeng}</span>
            </p>
            <p className="show-title-nick">
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