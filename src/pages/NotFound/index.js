import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found">
      <p>페이지를 찾을수가 없습니다.</p>
      <Link to="/">홈으로 돌아가기</Link>
    </div>
    );
}
 
export default NotFound;