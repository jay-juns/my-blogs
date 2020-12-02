import React from 'react';
import Button from './../Forms/Button';

const LoadMore = ({
  onLoadMoreEvt = () => {},
}) => {
  
  return (
    <Button className="add-btn" onClick={() => onLoadMoreEvt()}>
      더보기
    </Button>
  );
};

export default LoadMore;