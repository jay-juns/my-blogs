import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Tagtype from './../../InquireBoard/InquireTagType';

const MainInquireItem = props => {
  const { data } = props;
  const items = data;

  if(!Array.isArray(items)) return null;
  if(items.length < 1) {
    return (
      <div className="main-inquire-items">
        올라온 글이 없습니다.
      </div>
    );
  }

  return (
    <div className="main-inquire-items">
      {(Array.isArray(items) && items.length > 0) && items.map((items, pos) => {
        const { createdDate, displayName, inquireTitle, inquireTag, documentID } = items;
        const newTime = createdDate.toDate().toString();


        return (
          <div className="main-inquire-items-container" key={pos}>
            <Link className="main-inquire-items-row" to={`/inquireText/${documentID}`}>
              <div className="main-inquire-items-recommend">0</div>
              <div className="main-inquire-items-tag">
                <p className="main-inquire-items-tag--name">
                  <span className={`${Tagtype(inquireTag)} main-inquire-items-tag--name-span`}>{inquireTag}</span>
                </p>
              </div>
              <div className="main-inquire-items-title">
                <p className="main-inquire-items-title--contents">{inquireTitle}</p>
                
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