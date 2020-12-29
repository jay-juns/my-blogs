import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { fetchInquireStart, setInquire, updateInquire, deleteInquireStart,
  addInquireComments } from './../../../redux/Inquires/inquires.actions';
import { checkUserIsAdmin } from './../../../Utils';

import CKEditor from 'ckeditor4-react';

import Button from './../../Forms/Button';
import Modal from './../../Forms/Modal';
import FormInput from './../../Forms/FormInput';
import FormSelect from './../../Forms/FormSelect';
import FormChatInput from './../../Forms/FormChatInput';

import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles.scss';

const mapState = state => ({
  inquire: state.inquiresData.inquire,
  currentUser: state.user.currentUser
})

const InquireCard = ({}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { inquireID } = useParams();
  const { inquire } = useSelector(mapState);
  const { currentUser } = useSelector(mapState);
  const isAdmin = checkUserIsAdmin(currentUser);
  const [hideModal, setHideModal] = useState(true);
  const {
    inquireTitle,
    displayName,
    inquireTag,
    inquireDesc,
    documentID
  } = inquire;

  const [inquireEditTitle, setinquireEditTitle] = useState('');
  const [inquireEditDesc, setinquireEditDesc] = useState('');
  const [inquireEditTag, setInquireEditTag] = useState('제안');
  const [inquireComments, setInquireComments] = useState('');
  
  const [show, setShow] = useState(false);
  const showModal = !show ? '' : 'show-modal';
  const adminClass = isAdmin ? '' : 'hide';
  
  const resetForm = () => {
    setHideModal(true);
    setShow(false);
    setinquireEditTitle('');
    setinquireEditDesc('');
    setInquireEditTag('제안');
  };

  let userChatInfo = [];
  
  for (let name in currentUser) { 
    if (name.includes('displayName')) {
      userChatInfo.push(currentUser.displayName); 
    }
  }

  const chatUserName = userChatInfo[0];  

  const toggleModal = () => setHideModal(!hideModal);

  const configModal = {
    hideModal,
    toggleModal
  };
  
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

  const handleSubmit = e => {
    e.preventDefault();
    
    dispatch(
      updateInquire({
        inquireTag: inquireEditTag,
        inquireTitle: inquireEditTitle,
        inquireDesc: inquireEditDesc,
        displayName,
        id: documentID
      })
    );
    resetForm();
  };

  const handleDelete = () => {
    dispatch(
      deleteInquireStart(documentID)
    );
    history.push('/inquire');
  }

  const handleChat = () => {

    if( !currentUser ) return null;

    dispatch(
      addInquireComments({
        chatUserName,
        inquireComments
      })
    )
  }

  return(
    <div className="detail-wrap">
      <div className="detail-head-title">
        <h3>문의 내용</h3>
      </div>
      <div className="detail-container">
        <div className="detail-header"> 
          <div className="detail-header-left">
            <div className="detail-header-left--up">
              <div className="detail-header-left--up-contents">
                <p className="detail-title">{inquireTitle}</p> 
                <p className="detail-displayName">{displayName} <strong>님</strong></p>
              </div>

              <div className={`detail-header-left--up-btn-area ${adminClass}`}>
              
                <div className={`toggle-modal ${showModal}`}>
                  <Button onClick={() => toggleModal()}>수정하기</Button>
                  <Button onClick={() => handleDelete()}>
                    삭제
                  </Button>
                </div>
                {isAdmin && [
                  <Button className="threedot-btn" onClick={() => setShow(!show)}>
                    <FontAwesomeIcon className="i" icon={faEllipsisH} /> 
                  </Button>
                ]}
              </div>
              <Modal {...configModal}>
              <form onSubmit={handleSubmit}>
                <h2>글 수정하기</h2>

                <FormSelect 
                  label="태그 선택"
                  options={[{
                    name: "제안",
                    value: "제안"             
                  }, {
                    name: "의견",
                    value: "의견"
                  }]}
                  handleChange={e => setInquireEditTag(e.target.value)}
                />

                <FormInput 
                  label="제목"
                  formClass="modal-items"
                  type="text"
                  value={inquireEditTitle}
                  handleChange={e => setinquireEditTitle(e.target.value)}
                />  

                <CKEditor
                  onChange={evt => setinquireEditDesc(evt.editor.getData())}
                />

                <div className="btn-wrap">
                  <Button className="ent-btn" type="submit">
                    수정 완료
                  </Button>
                </div>
              </form>
            </Modal>
            </div>
            
            <div className="detail-header-left--footer-wrapper">
              <span>
                {inquireTag}
              </span>
            </div>
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
      <div>
        <div>
          <h3>댓글 0개</h3>
        </div>
        
        <FormChatInput 
          label="코멘트 작성"
          formClass="chat-input"
          value={inquireComments}
          handleChange={e => setInquireComments(e.target.value)}
          onClick={() => handleChat()}
        />

        <div>

        </div>
      </div>
    </div>
  );
}

export default InquireCard;