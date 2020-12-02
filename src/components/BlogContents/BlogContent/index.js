import React from 'react';
import { Link } from 'react-router-dom';

const Content = (content) => {

  const {
    documentID,
    contentThumbnail,
    contentTitle,
    contentDesc
  } = content;

  return (
    <div className="product">
      <div className="thumb">
        <Link to={`/blog/${documentID}`}>
          <img src={contentThumbnail} alt={contentTitle} />
        </Link>
      </div>
      <div className="details">
        <ul>
          <li>
            <span className="name">
              <Link to={`/blog/${documentID}`}>
                {contentTitle} 
              </Link>
            </span>
          </li>
          <li>
          <p
              dangerouslySetInnerHTML={{ __html: contentDesc }}
            />
          </li>
        </ul>
      </div>
      
    </div>
  );
};

export default Content;