import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { fetchInquireStart, setInquire  } from './../../../redux/Inquires/inquires.actions';

import Button from './../../Forms/Button';

import './styles.scss';

const mapState = state => ({
  inquire: state.inquiresData.inquire
})

const InquireCard = ({}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { inquireID } = useParams();
  const { inquire } = useSelector(mapState);

  const {
    inquireTitle,
    displayName,
    inquireDesc
  } = inquire;
  
  useEffect(() => {
    dispatch(
      fetchInquireStart(inquireID)
    )

    return () => {
      dispatch(
        setInquire({})
      )
    }

  }, []);


  return(
    <div className="detail-wrap">
      <div className="detail-head-title">
        <h3>문의 내용</h3>
      </div>
      <div className="detail-container">
        <div className="detail-header"> 
          <div className="detail-header-left">
            <p className="detail-title">{inquireTitle}</p> 
            <p className="detail-displayName">{displayName} <strong>님</strong></p>
          </div>
        </div>
        <div className="detail-body">
          <span
          className="desc"
          dangerouslySetInnerHTML={{ __html: inquireDesc }} />
        </div>
      </div>
      <div className="detail-btn-wrap">
        <Button className="back-btn" onClick={() => history.goBack()}>목록으로 이동</Button>
      </div>
    </div>
  );
}

export default InquireCard;