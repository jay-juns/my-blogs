import React from 'react';
import { Link } from 'react-router-dom';

const MainContentsItems = ({
  contentTitle,
  contentThumbnail,
  contentDesc,
  documentID
}) => {


  if(!contentThumbnail || !contentTitle || !contentDesc) return null;
   
  return (
    <div className="other-main">
      <Link className="main-inquire-items-row" to={`/blogDetail/${documentID}`}>
      <div className="other-img">
        <img src={contentThumbnail} alt="img" />
      </div>
      <div className="other-contents">
        <p className="other-title">{contentTitle}</p>
        <p
        dangerouslySetInnerHTML={{ __html: contentDesc }}
      />  
      </div>
      </Link>
    </div>
  );
};

export default MainContentsItems;