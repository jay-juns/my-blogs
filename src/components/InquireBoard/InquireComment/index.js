import React, { useState } from 'react';
import { useDispatch, useSelector } from  'react-redux';
import { checkUserIsAdmin } from './../../../Utils';
import { deleteInquireComments } from './../../../redux/Comments/InquireComments/InquireComments.actions';

import Button from './../../Forms/Button';
import ConfirmCommentsModal from './../../Modals/ConfirmCommentsModal';

import './styles.scss';
import moment from 'moment';
import 'moment/locale/ko';

import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const mapState = (state) => ({
  currentUser: state.user.currentUser
});

const InquireComments = props => {
  const { messageRoomData } = props;
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  const [hideModal, setHideModal] = useState(true);
  const [modalType, setModalType] = useState('');
  const [compareId, setCompareId] = useState({});
  const isAdmin = checkUserIsAdmin(currentUser);
  const items = messageRoomData;
  const toggleModal = (type, e) =>{
    setHideModal(!hideModal);
    setModalType(type);
    setCompareId(e);
  };
  const cofirmConfigModal = {
    hideModal,
    modalType,
    toggleModal
  };

  return (
    <div className="inquire-text">
      {(Array.isArray(items) && items.length > 0) && items.map((text) => {
        const { author, authorColor, authorImgUrl, inquireText, uid, createAt, documentID } = text;
        const timeZone = createAt.toDate().toString();
        const nowTime = moment(timeZone).fromNow();
        const userStyleColor = authorImgUrl ? {
          position: 'relative',
          overflow: 'hidden'
        } : { backgroundColor: authorColor };
        const userLogo = authorImgUrl ? <img src={`${authorImgUrl}`} alt="userLogo" /> : <FontAwesomeIcon className="i" icon={faUser} />;

        const handleDeleteSubmit = e => {
          e.preventDefault();

          dispatch(
            deleteInquireComments(documentID)
          );
          
          setTimeout(() => {
            window.location.reload();
          }, 300);
        }
      
        return (
          <div className="inquire-comment-area" key={uid}>
            {   
              <ConfirmCommentsModal {...cofirmConfigModal} id={compareId} target={uid}>
                <form onSubmit={handleDeleteSubmit}>
                  <p>댓글을 삭제하시겠습니까?</p>
                  <div className="confirm-modal--btn-wrap">
                    <Button className="btn" onClick={() => toggleModal()}> 
                      취소
                    </Button>
                    <Button className="confirm-modal--ent-btn btn" type="submit">
                      확인
                    </Button> 
                  </div>
                </form>
              </ConfirmCommentsModal>
            }

            <div className="inquire-comment-area--img" style={userStyleColor}>
              {userLogo}
            </div>
            <div className="inquire-comment-area--contents">
              <div className="inquire-comment-area--head">
                <p>{author}</p>
                <span>{nowTime}</span>
              </div>
              <div className="inquire-comment-area--body">
                <pre id={`${uid}`}>{inquireText}</pre>  
              </div>
            </div>
            
           {isAdmin &&
            <div className="inquire-comment-area--delete-btn" key="controlCommentSettings">
              <Button id={uid} className="btn"  type="button" onClick={(e) => toggleModal('ConfirmCommentsModal', e.target.id)}>
                  삭제
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