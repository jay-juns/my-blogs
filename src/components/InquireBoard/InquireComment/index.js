import React from 'react';
import { useDispatch, useSelector } from  'react-redux';
import { checkUserIsAdmin } from './../../../Utils';
import { deleteInquireComments } from './../../../redux/Comments/InquireComments/InquireComments.actions';
import Button from './../../Forms/Button';
import './styles.scss';
import moment from 'moment';
import 'moment/locale/ko';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const mapState = (state) => ({
  currentUser: state.user.currentUser
});

const InquireComments = props => {
  const { comBoxResult } = props;
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  const isAdmin = checkUserIsAdmin(currentUser);
  const items = comBoxResult;

  console.log(items, 'messageData');
  
  return (
    
    <div className="inquire-text">
      {(Array.isArray(items) && items.length > 0) && items.map((text) => {
        const { author, inquireText, uid, createAt, documentID } = text;
        const timeZone = createAt.toDate().toString();
        const nowTime = moment(timeZone).fromNow();

        const handleDelete = () => {
          dispatch(
            deleteInquireComments(documentID)
          );
        }
      
        return (
          <div className="inquire-comment-area" key={uid}>
            <div className="inquire-comment-area--head">
              <p>{author}</p>
              <span>{nowTime}</span>
            </div>
            <div className="inquire-comment-area--body">
              <pre id={`${uid}`}>{inquireText}</pre>  
            </div>
           {isAdmin &&
            <div className="inquire-comment-area--delete-btn" key="controlCommentSettings">
              <Button className="btn" onClick={() => handleDelete()}>
                <FontAwesomeIcon className="i" icon={faTrash} />
              </Button>
            </div>
           } 
          </div>
        )
      })}
    </div>
  )
}

export default InquireComments;
