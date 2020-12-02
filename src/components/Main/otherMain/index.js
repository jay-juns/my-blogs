import React from 'react';

const otherMain = ({
  contentTitle,
  contentThumbnail,
  contentDesc
}) => {
  if(!contentThumbnail || !contentTitle || !contentDesc) return null;

  return (
    <div className="other-main">
      {contentTitle}
      <p
        dangerouslySetInnerHTML={{ __html: contentDesc }}
      />
    </div>
  );
};

export default otherMain;