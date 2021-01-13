import React from 'react';
import { Link } from 'react-router-dom';

import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }


  return (
    <div className="paging-number">
      
      <Link
      className={currentPage <= 1 ? 'page none' : 'page'}
      onClick={() => {paginate(currentPage - 1)}} 
      to={`/inquirePage=/${currentPage - 1}`}>
        <FontAwesomeIcon className="i" icon={faAngleLeft} />
      </Link>
      
      {pageNumbers.map(number => (
        <Link 
          onClick={() => {paginate(number)}} 
          to={`/inquirePage=/${ number}`}
          className={currentPage === number.toString() || currentPage === number ? `page active` : `page ${number}`} 
          key={number}>
            {number}
        </Link>
      ))}
      
      <Link
      className={pageNumbers.length < currentPage + 1 ? 'page none' : 'page'}
      onClick={() => {paginate(currentPage + 1)}} 
      to={`/inquirePage=/${currentPage + 1}`} >
        <FontAwesomeIcon className="i" icon={faAngleRight} />
      </Link>

    </div>
  )
}

export default Pagination;
