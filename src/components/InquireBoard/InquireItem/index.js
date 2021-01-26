import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import TagType from './../InquireTagType';

const InquireItem = (inquireText) => {
  const {
    inquireTitle,
    displayName,
    documentID,
    likeInfo,
    inquireTag,
    createdDate,
    comLengResult
  } = inquireText;

  const comMsg = comLengResult.filter((lengID) => {
    if(lengID === documentID) {
      return true;
    }
    return false;
  });

  if(!inquireTitle || !displayName || !documentID) return null;  

  const toDate = createdDate.toDate().toString();

  return (  
  
    <div className="show-item-wrap" >
      <Link to={`/inquireDetail/${documentID}`}>
        <div className="show-item-header-title">
          <p className="rec-number">{likeInfo[0].likeCount}</p>
        </div>

        <div className="show-text">
          <div className="show-title">
            <p className="show-tag">
              <span className={`${TagType(inquireTag)} show-tag--span`}>{inquireTag}</span>
            </p>
            <p className="show-titie-first">
              <span className="show-titie-first--middle">{inquireTitle}</span> 
              {comMsg.length === 0 ? '': (<span className="comment-length">[{comMsg.length}]</span>)}
            </p>
            <p className="show-title-nick">
              {displayName}
            </p>
            <span className="show-title-day">
              {moment(toDate).format("MM/DD")}
            </span>
            
          </div>
                        
        </div>
      </Link>
    </div>
  );
}

export default InquireItem;