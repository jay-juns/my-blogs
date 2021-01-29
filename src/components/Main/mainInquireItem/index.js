import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { fetchInquireComments } from './../../../redux/Comments/InquireComments/InquireComments.actions';

import Tagtype from './../../InquireBoard/InquireTagType';

const mapState = (state) => ({
  inquireComments: state.messages.inquireComments
})

const MainInquireItem = props => {
  const dispatch = useDispatch();
  const { inquireComments } = useSelector(mapState);
  const { data } = props;
  const items = data;
  let comLengResult = [];

  useEffect(() => {
    dispatch(
      fetchInquireComments()
    )
  }, [dispatch]);

  if(Array.isArray(inquireComments.messageData) && inquireComments.messageData.length > 0 ) {
    inquireComments.messageData.forEach((el) => {
      comLengResult.push(el.id);
    })
  }

  if(!Array.isArray(items)) return null;
  if(items.length < 1) {
    return (
      <div className="main-inquire-items">
        <p className="un-text">올라온 글이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="main-inquire-items">
      {(Array.isArray(items) && items.length > 0) && items.map((items, pos) => {
        const { createdDate, displayName, inquireTitle, likeInfo, inquireTag, documentID } = items;
        const newTime = createdDate.toDate().toString();
        let commentLengsResult;
        if(Array.isArray(inquireComments.messageData) && inquireComments.messageData.length > 0 ) {
          commentLengsResult = comLengResult.filter((lengID) => {
            if(lengID === documentID) {
              return true;
            }
            return false;
          });
        }
        
        return (
          <div className="main-inquire-items-container" key={pos}>
            <Link className="main-inquire-items-row" to={`/inquireDetail/${documentID}`}>
              <div className="main-inquire-items-recommend">{likeInfo[0].likeCount}</div>
              <div className="main-inquire-items-tag">
                <p className="main-inquire-items-tag--name">
                  <span className={`${Tagtype(inquireTag)} main-inquire-items-tag--name-span`}>{inquireTag}</span>
                </p>
              </div>
              <div className="main-inquire-items-title">
                <p className="main-inquire-items-title--contents">{inquireTitle}</p>
                {
                  (Array.isArray(inquireComments.messageData)) && inquireComments.messageData.length > 0 && [
                    commentLengsResult.length === 0 || !commentLengsResult ? '': (<span className="comment-length" key={pos}>[{commentLengsResult.length}]</span>)
                  ]
                }
              </div>
              <div className="main-inquire-items-name">{displayName}</div>
              <div className="main-inquire-items-day">{moment(newTime).format('MM/DD')}</div>
            </Link>
          </div>
        )
      })}
    </div>
  );
};

export default MainInquireItem;