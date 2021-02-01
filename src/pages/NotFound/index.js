import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 Error: NotFound - MyBlogs</title>
      </Helmet>
      <div className="not-found">
        <p>페이지를 찾을수가 없습니다.</p>
        <Link to="/">홈으로 돌아가기</Link>
      </div>
    </>
    );
}
 
export default NotFound;