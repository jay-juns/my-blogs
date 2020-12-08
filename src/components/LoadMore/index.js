import React from 'react';
import Button from './../Forms/Button';

const LoadMore = ({
  onLoadMoreEvt = () => {},
}) => {
  
  return (
    <div className="add-btn-wrap">
      <Button className="add-btn" onClick={() => onLoadMoreEvt()}>
      더보기
    </Button>
    </div>
  );
};

export default LoadMore;