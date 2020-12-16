import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchInquireStart, setInquire  } from './../../../redux/Inquires/inquires.actions';
import moment from 'moment';
import './styles.scss';

const mapState = state => ({
  inquire: state.inquiresData.inquire
})

const InquireCard = ({}) => {
  const dispatch = useDispatch();
  const { inquireID } = useParams();
  const { inquire } = useSelector(mapState);

  const {
    inquireTitle,
    createdDate,
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
    <div>
      <div>
        <p>{displayName}</p>
        <span>
          {moment(createdDate.toDate().toString()).format('MM-DD')}
        </span>
      </div>

      <div>{inquireTitle}</div>
      <span
              className="desc"
              dangerouslySetInnerHTML={{ __html: inquireDesc }} />
    </div>
  );
}

export default InquireCard;