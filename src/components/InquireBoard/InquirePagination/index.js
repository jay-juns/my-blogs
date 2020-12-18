import React from 'react';
import { Link } from 'react-router-dom';


export const pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="paging-number">
      {pageNumbers.map(number => (
        <Link 
          onClick={(e) => {
            e.preventDefault();
            paginate(number);
          }} 
          href='#' 
          to={{
            pathname: "/inquire"
          }}
          className={currentPage === number ? 'page active' : 'page'} 
          key={number}>
            {number}
        </Link>
      ))}
    </div>
  )
}

export default pagination;
