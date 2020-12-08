import React from 'react';
import moment from 'moment';

const BlogItem = ({
  contentTitle,
  contentThumbnail,
  contentDesc,
  createdDate
}) => {
  if(!contentTitle) return null;

  return (  
  
    <div className="show-item-wrap">
      <div>
        <p>
          displayname
        </p>
      </div>
      <div className="show-img">
        <img src={contentThumbnail} alt="img" />
      </div>
      <div className="show-text">
        <div className="show-title">
          <p className="show-titie-first">{contentTitle}</p>
          <p
            dangerouslySetInnerHTML={{ __html: contentDesc }}
          />
          <span>
            작성날짜: {moment(createdDate.toDate().toString()).format('YYYY-MM-DD')}
          </span>
        </div>
                      
      </div>  
    </div>
  );
}

export default BlogItem;