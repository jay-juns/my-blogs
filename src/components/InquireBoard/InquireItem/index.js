import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { checkUserIsAdmin } from './../../../Utils';
import { deleteInquireStart  } from './../../../redux/Inquires/inquires.actions';
import Button from './../../Forms/Button';
import moment from 'moment';

const mapState = ({ user }) => ({
  currentUser: user.currentUser
})

const InquireItem = (inquireText) => {
  const {
    inquireTitle,
    displayName,
    documentID,
    inquireTag,
    classBg,
    pos,
    createdDate
  } = inquireText;
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  const isAdmin = checkUserIsAdmin(currentUser);

  
  if(!inquireTitle || !displayName || !documentID) return null;

  const toDate = createdDate.toDate().toString();

  return (  
  
    <div className="show-item-wrap" >
      <Link to={`/inquireText/${documentID}`}>
        <div className="show-item-header-title">
          <p>{pos}</p>
        </div>

        <div className="show-text">
          <div className="show-title">
            <p className={`${classBg} show-tag`}>
              {inquireTag}
            </p>
            <p className="show-titie-first">
              {inquireTitle}
            </p>
            <p className="show-title-nick">
              {displayName}
            </p>
            <span>
              {moment(toDate).format('MM-DD')}
            </span>
            
            {isAdmin && [
              <div className="show-del-btn-wrap" key={documentID}>
                <Button onClick={() => dispatch(deleteInquireStart(documentID))}>
                  삭제
                </Button>
              </div>
            ]}
          </div>
                        
        </div>
      </Link>
    </div>
  );
}

export default InquireItem;