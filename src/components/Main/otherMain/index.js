import React from 'react';

const otherMain = ({
  contentTitle,
  contentThumbnail,
  contentDesc
}) => {
  if(!contentThumbnail || !contentTitle || !contentDesc) return null;

  return (
    <div className="other-main">
      <div className="other-img">
        <img src={contentThumbnail} alt="img" />
      </div>
      <div className="other-contents">
        <p className="other-title">{contentTitle}</p>
        <p
        dangerouslySetInnerHTML={{ __html: contentDesc }}
      />  
      </div>
    </div>
  );
};

export default otherMain;