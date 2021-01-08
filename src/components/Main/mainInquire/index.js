import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchInquiresStart } from './../../../redux/Inquires/inquires.actions';
import { fetchInquireComments } from './../../../redux/Comments/InquireComments/InquireComments.actions';

import MainInquireItem from './../mainInquireItem';

import { faThLarge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles.scss'

const mapState = ({ inquiresData, messages }) => ({
  inquires: inquiresData.inquires,
  inquireComments: messages.inquireComments
})

const MainInquire = ({ }) => {

  const dispatch = useDispatch();
  const { inquires, inquireComments } = useSelector(mapState);
  const { data } = inquires;

  useEffect(() => {
    dispatch(
      fetchInquiresStart()
    )
  }, []);

  useEffect(() => {
    dispatch(
      fetchInquireComments()
    )
  }, []);

  let queData;
  let queDataLeng;
  let comLengResult = [];

  if(Array.isArray(data) && data.length > 1) {
    queData = Object.entries(data);
    queDataLeng = queData.slice(0, 4);
  }

  if(Array.isArray(inquireComments.messageData) && inquireComments.messageData.length > 0 ) {
    inquireComments.messageData.forEach((el) => {
      comLengResult.push(el.id);
    })
  }

  const configMainInquire = {
    queDataLeng,
    comLengResult
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