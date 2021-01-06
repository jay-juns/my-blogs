import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';

import { fetchInquireStart, setInquire, updateInquire, deleteInquireStart } from './../../../redux/Inquires/inquires.actions';
import { addInquireComments, fetchInquireComments, setInquireComments } from './../../../redux/Comments/InquireComments/InquireComments.actions';
import { checkUserIsAdmin } from './../../../Utils';

import CKEditor from 'ckeditor4-react';

import Button from './../../Forms/Button';
import Modal from './../../Forms/Modal';
import FormInput from './../../Forms/FormInput';
import FormSelect from './../../Forms/FormSelect';
import FormChatInput from './../../Forms/FormChatInput';

import InquireComments from './../InquireComment';

import TagType from './../InquireTagType';

import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles.scss';

const mapState = state => ({
  inquire: state.inquiresData.inquire,
  currentUser: state.user.currentUser,
  inquireComments: state.messages.inquireComments
})

const InquireCard = ({}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { inquireID } = useParams();
  const { inquire, currentUser, inquireComments } = useSelector(mapState);

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
  const [inquireText, setInquireText] = useState('');
  
  const [show, setShow] = useState(false);
  const showModal = !show ? '' : 'show-modal';
  
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

  const author = userChatInfo[0];  
  const resetInput = () => {
    setInquireText('');
    document.getElementById("submitBtn").disabled = true;
    document.getElementById("submitBtn").classList.remove('btn');
  }

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

  useEffect(() => {
    dispatch(
      fetchInquireComments()
    )

    return () => {
      dispatch(
        setInquireComments({})
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

  const handleChat = e => {
    e.preventDefault();

    if(!currentUser) return null;

    dispatch(
      addInquireComments({
        author,
        inquireText,
        id: documentID
      })
    );
    resetInput();
  };

  let comBoxResult;
  let comLeng = 0;

  if(Array.isArray(inquireComments.messageData) && inquireComments.messageData.length > 0) {

    comBoxResult = inquireComments.messageData.filter((keyID) => {
      if (keyID.id === documentID) {
        return true;
      }
      return false;
    });

    comLeng = Object.keys(comBoxResult).length;   
  }
  
  const configInquireComments = {
    comBoxResult
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

              <div className="detail-header-left--up-btn-area">
              
                {isAdmin && [
                  <div key="showToggleModal" className={`toggle-modal ${showModal}`}>
                    <Button onClick={() => toggleModal()}>수정하기</Button>
                    <Button onClick={() => handleDelete()}>
                      삭제
                    </Button>
                  </div>,
                  <Button key="showButton" className="threedot-btn btn" onClick={() => setShow(!show)} key="manageBtn">
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
                  }, {
                    name: "기타",
                    value: "기타"
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
                  <Button className="ent-btn btn" type="submit">
                    수정 완료
                  </Button>
                </div>
              </form>
            </Modal>
            </div>
            
            <div className="detail-header-left--footer-wrapper">
              <span className={`detail-header-left--tag ${TagType(inquireTag)}`}>
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
        <Link className="back-btn" to={'/inquire'}>목록으로 이동</Link>
      </div>
      <div className="inquire-detail-comment-wrapper">
        <div className="inquire-detail-comment-wrapper--header">
          <p>댓글 {comLeng}개</p>
        </div>

        {currentUser &&[
        <form onSubmit={handleChat} key="formChatArea">
          <FormChatInput 
            label="댓글 작성"
            formClass="chat-input"
            value={inquireText}
            handleChange={e => setInquireText(e.target.value)}
          />
        </form>
        ]} 
        {!currentUser && [
        <div className="show-guest-user" key="currentUserBtn">
          <Link to={'/login'}>로그인을 해야 댓글 작성이 가능합니다. 먼저 로그인을 해주세요.</Link>
        </div>
        ]}

          <InquireComments {...configInquireComments}/> 
      </div>
    </div>
  );
}

export default InquireCard;