import React from 'react';
import Button from './../Forms/Button';

const LoadMore = ({
  onLoadMoreEvt = () => {},
}) => {
  
  return (
    <Button onClick={() => onLoadMoreEvt()}>
      더보기
    </Button>
  );
};

export default LoadMore;