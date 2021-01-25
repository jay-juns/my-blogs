import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ko';

const BlogItem = ({
  contentTitle,
  contentThumbnail,
  contentDesc,
  createdDate,
  documentID
}) => {
  if(!contentTitle) return null;
  const timeZone = createdDate.toDate().toString();
  const nowTime = moment(timeZone).fromNow();

  return (  
  
    <div className="show-item-wrap">
      <Link to={`/blogDetail/${documentID}`}>
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
              {nowTime}
            </span>
          </div>
                        
        </div> 
      </Link> 
    </div>
  );
}

export default BlogItem;