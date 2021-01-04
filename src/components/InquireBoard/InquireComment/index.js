import React from 'react';
import './styles.scss';
import moment from 'moment';
import 'moment/locale/ko';

export const InquireComments = props => {
  const { comBoxResult } = props;
  const items = comBoxResult;

  return (
    
    <div className="inquire-text">
      {(Array.isArray(items) && items.length > 0) && items.map((text) => {
        const { author, inquireText, uid, createAt } = text;
        const timeZone = createAt.toDate().toString();
        const nowTime = moment(timeZone).fromNow();

        return (
          <div className="inquire-comment-area" key={uid}>
            <div className="inqure-comment-area--head">
              <p>{author}</p>
              <span>{nowTime}</span>
            </div>
            <div className="inqure-comment-area--body">
              <p>{inquireText}</p>  
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default InquireComments;
