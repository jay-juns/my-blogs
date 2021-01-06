import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Tagtype from './../../InquireBoard/InquireTagType';

const MainInquireItem = props => {
  const { queDataLeng, comLengResult } = props;
  const items = queDataLeng;
  let commentLengs = comLengResult;
  let itemsQueInquire = [];
  if(!Array.isArray(items)) return null;
  if(items.length < 1) {
    return (
      <div className="main-inquire-items">
        올라온 글이 없습니다.
      </div>
    );
  }
  if(Array.isArray(items) && items.length > 0) {

    for(let i = 0; i < items.length; i++) {
      itemsQueInquire.push(items[i][1]);
    }
  }

  return (
    <div className="main-inquire-items">
      {(Array.isArray(items) && items.length > 0) && itemsQueInquire.map((items, pos) => {
        const { createdDate, displayName, inquireTitle, inquireTag, documentID } = items;
        const newTime = createdDate.toDate().toString();
        let commentLengsResult = commentLengs.filter((lengID) => {
          if(lengID === documentID) {
            return true;
          }
          return false;
        });

        return (
          <div className="main-inquire-items-container" key={pos}>
            <Link className="main-inquire-items-row" to={`/inquireText/${documentID}`}>
              <div className="main-inquire-items-recommend">0</div>
              <div className="main-inquire-items-tag">
                <p className={`main-inquire-items-tag--name ${Tagtype(inquireTag)}`}>{inquireTag}</p>
              </div>
              <div className="main-inquire-items-title">
                <p className="main-inquire-items-title--contents">{inquireTitle}</p>
                {commentLengsResult.length === 0 ? '': (<span className="comment-length">[{commentLengsResult.length}]</span>)}  
              </div>
              <div className="main-inquire-items-name">{displayName}</div>
              <div className="main-inquire-items-day">{moment(newTime).format('MM-DD')}</div>
            </Link>
          </div>
        )
      })}
    </div>
  );
};

export default MainInquireItem;