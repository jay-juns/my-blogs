import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchInquiresMainStart } from './../../../redux/Inquires/inquires.actions';
import { fetchInquireComment } from './../../../redux/Comments/InquireComments/InquireComments.actions';

import MainInquireItem from './../mainInquireItem';

import { faThLarge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles.scss'

const mapState = ({ inquiresData, messages }) => ({
  inquires: inquiresData.inquires,
  inquireComment: messages.inquireComment
})

const MainInquire = ({ }) => {

  const dispatch = useDispatch();
  const { inquires, inquireComment } = useSelector(mapState);
  const { data } = inquires;

  useEffect(() => {
    dispatch(
      fetchInquiresMainStart()
    )
  }, []);

  useEffect(() => {

    dispatch(
      fetchInquireComment({ })
    )
  }, []);

  const configMainInquire = {
    data
  };

  return (
    <div className="main-inquire">
      <div className="main-inquire-add-btn-wrapper">
        <Link className="inquire-add-btn" to={'/inquirePage=/1'}>
        <FontAwesomeIcon className="i" icon={faThLarge} />
          <span>모두 보기</span>
        </Link>
      </div>
      <div className="main-inquire-items-header">
        <div className="main-inquire-items-header-recommend">추천수</div>
        <div className="main-inquire-items-header-tag">Tag</div>
        <div className="main-inquire-items-header-title">제목</div>
        <div className="main-inquire-items-header-name">작성자</div>
        <div className="main-inquire-items-header-day">일시</div>
      </div>
      <MainInquireItem {...configMainInquire}/>
    </div>
  );
};

export default MainInquire;