import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  fetchInquireStart, 
  updateInquire, 
  deleteInquireStart,
  updateInquireView, 
  inquireLike
} from './../../../redux/Inquires/inquires.actions';
import { addInquireComments, fetchInquireComment } from './../../../redux/Comments/InquireComments/InquireComments.actions';
import { checkUserIsAdmin } from './../../../Utils';
import CKEditor from 'ckeditor4-react';
import Button from './../../Forms/Button';
import Modal from './../../Modals/Modal';
import FormInput from './../../Forms/FormInput';
import FormSelect from './../../Forms/FormSelect';
import FormChatInput from './../../Forms/FormChatInput';
import Alert from './../../Alert';
import InquireComments from './../InquireComment';
import InquireCardDummy from './../InquireCardDummy';
import TagType from './../InquireTagType';
import ConfirmModal from './../../Modals/ConfirmModal';
import { faEllipsisH, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.scss';

const mapState = state => ({
  inquire: state.inquiresData.inquire,
  currentUser: state.user.currentUser,
  inquireComment: state.messages.inquireComment
})

const InquireCard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { inquireID } = useParams();
  const { inquire, currentUser, inquireComment } = useSelector(mapState);
  const isAdmin = checkUserIsAdmin(currentUser);
  const [hideModal, setHideModal] = useState(true);
  const [modalType, setModalType] = useState('');
  const {
    inquireTitle,
    displayName,
    inquireTag,
    inquireDesc,
    likeInfo,
    inquireView,
    documentID,
    userColor,
    userId,
    userImgUrl
  } = inquire;
  const { messageRoomData } = inquireComment;
  const [view, setView] = useState(0);
  const [inquireEditTitle, setinquireEditTitle] = useState('');
  const [inquireEditDesc, setinquireEditDesc] = useState('');
  const [inquireEditTag, setInquireEditTag] = useState('제안');
  const [inquireText, setInquireText] = useState('');
  const [hideAlert, setHideAlert] = useState(false);
  const [text, setText] = useState('');
  const [color, setColor] = useState('');
  const [isPending, setIsPending] = useState(false); 
  const [show, setShow] = useState(false);
  const showModal = !show ? '' : 'show-modal';
  const userStyleColor = userImgUrl ? {
    backgroundColor: 'transparent',
    position: 'relative',
    width: '20px',
    height: '20px',
    overflow: 'hidden'
  } : {backgroundColor: userColor};
  const userLogo = userImgUrl ? <img src={`${userImgUrl}`} alt="userLogo" /> : <FontAwesomeIcon className="i" icon={faUser} />;

  let userChatInfo = [];
  
  for (let name in currentUser) { 
    if (name.includes('displayName')) {
      userChatInfo.push(currentUser.displayName, currentUser.userId, currentUser.color, currentUser.userImgUrl, currentUser.id); 
    }
  }

  const author = userChatInfo[0]; 
  const authorId = userChatInfo[1];
  const authorColor = userChatInfo[2];
  const authorImgUrl = userChatInfo[3];
  const authorUserId = userChatInfo[4];  
  
  const resetForm = () => {
    setHideModal(true);
    setShow(false);
    setinquireEditTitle('');
    setinquireEditDesc('');
    setInquireEditTag('제안');
    setText('');
    setColor('');
    setModalType('');
  };
  const resetInput = () => {
    setInquireText('');
    document.getElementById("submitBtn").disabled = true;
    document.getElementById("submitBtn").classList.remove('btn');
    document.getElementById("commentContent").style.height = "19px";
  };

  const toggleModal = (type) =>{
    setHideModal(!hideModal);
    setModalType(type);
  }; 

  const configModal = {
    hideModal,
    modalType,
    toggleModal
  };

  const cofirmConfigModal = {
    hideModal,
    modalType,
    toggleModal
  };

  useEffect(() => {
    dispatch(
      fetchInquireStart(inquireID)
    )
    setTimeout(() => {
      setIsPending(true);  
    }, 200)
    setView(view + 1)
    console.log(view);
    console.log(inquireView);
    dispatch(
      updateInquireView({
        inquireView: view
      })
    )
  }, [dispatch, inquireID]);

  useEffect(() => {
    dispatch(
      fetchInquireComment({ inquireID })
    )
  }, [dispatch, inquireID]);

  const handleSubmit = e => {
    e.preventDefault();

    if(setShow(true)) setShow(false);

    if(inquireEditTitle === '' || inquireEditDesc === '') {
      setText('수정할 제목과 내용을 작성 해주세요.');
      setColor('danger');
      setTimeout(() => {
        setHideAlert(true);
      }, 120);
      return setHideAlert(false); 
    }
    
    dispatch(
      updateInquire({
        inquireTag: inquireEditTag,
        inquireTitle: inquireEditTitle,
        inquireDesc: inquireEditDesc,
        displayName, 
        id: documentID,
        userColor,
        inquireView,
        userId,
        userImgUrl
      })
    );
    resetForm();
  };

  const handleDeleteSubmit = e => {
    e.preventDefault();

    dispatch(
      deleteInquireStart(documentID)
    )

    history.goBack()
  };

  const handleChat = e => {
    e.preventDefault();

    if(!currentUser) return null;

    dispatch(
      addInquireComments({
        author,
        authorId,
        authorColor,
        authorUserId,
        authorImgUrl,
        inquireText,
        id: documentID
      })
    );
    setText('댓글 작성 완료.');
    setColor('success');
    setTimeout(() => {
      setHideAlert(true);
    }, 300);
    resetInput();
    setHideAlert(false); 
  };
  
  const handleLike = () => {

    if(!currentUser) {
      setText('로그인한 사용자만 가능합니다.');
      setColor('danger');
      setTimeout(() => {
        setHideAlert(true);
      }, 30);
      return setHideAlert(false); 
    }

    let userArray = likeInfo[0].userInfo;
    const userID = currentUser ? currentUser.id : null;
     
    if(currentUser && !userArray.includes(userID)) {
      userArray.push(userID);
    } else {
      const deUserID = userArray.indexOf(userID);
      userArray.splice(deUserID, 1);
    }

    dispatch(
      inquireLike({
        inquireTitle,
        displayName,
        inquireTag,
        inquireDesc,
        documentID,
        inquireView,
        likeInfo: [{
          likeCount: userArray.length,
          userInfo: userArray
        }]
    }))
  }

  const configInquireComments = {
    messageRoomData
  };

  const configAlert = {
    text: text,
    color: color,
    position: 'leftLeft',
    hideAlert: hideAlert
  };

  return(
      <div className="detail-wrap">
        <Helmet>
          <title> 문의사항 상세 페이지 - My Blogs</title>
        </Helmet> 
        <div className="detail-head-title">
          <h3>문의 내용</h3>
        </div>
        
        {hideAlert && <Alert {...configAlert} key="inquireWrite"/>}

        {!isPending && (
          <InquireCardDummy />
        )}

        {isPending && ( 
        <div className="detail-container">
          <div className="detail-header">
          
            <div className="detail-header-left">
              <div className="detail-header-left--up">
                <div className="detail-header-left--up-contents">
                  <p className="detail-title">{inquireTitle}</p>
                  <div className="detail-user-info-wrap">
                    <span className="detail-user-img" style={userStyleColor}>
                      {userLogo}
                    </span>
                    <p className="detail-displayName">{displayName} <strong>님</strong></p>
                  </div> 
                </div>

                <div className="detail-header-left--up-btn-area">
                
                  {isAdmin &&
                    <> 
                      <div key="background" className={`show-toggle-bg ${showModal}`} onClick={() => setShow(!show)}></div>
                      <div key="showToggleModal" className={`toggle-modal ${showModal}`}>
                        <Button className="btn" onClick={() => toggleModal('modal')}>수정하기</Button>
                        <Button className="btn" onClick={() => toggleModal('confirmModal')}>
                          삭제
                        </Button>
                      </div>
                      <Button key="showButton" className="threedot-btn btn" onClick={() => setShow(!show)}>
                        <FontAwesomeIcon className="i" icon={faEllipsisH} /> 
                      </Button>
                    </>
                  }
                </div>
                <Modal {...configModal}>
                  <form onSubmit={handleSubmit}>
                    <h2>글 수정하기</h2>

                    <FormSelect 
                      label="태그 선택"
                      options={[{
                        name: "제안",
                        value: "제안"             
                      }, 
                      {
                        name: "의견",
                        value: "의견"
                      },
                      {
                        name: "버그제보",
                        value: "버그제보"
                      }, 
                      {
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

                <ConfirmModal {...cofirmConfigModal} key="confirm-inquire-modal">
                  <form onSubmit={handleDeleteSubmit}>
                    <p>문의사항 글을 삭제하시겠습니까?</p>
                    <div className="confirm-modal--btn-wrap">
                      <Button className="btn" onClick={() => toggleModal()}> 
                        취소
                      </Button>
                      <Button className="confirm-modal--ent-btn btn" type="submit">
                        확인
                      </Button> 
                    </div>
                  </form>
                </ConfirmModal>        

              </div>
              
              <div className="detail-header-left--footer-wrapper">
                <span className={`detail-header-left--tag ${TagType(inquireTag)}`}>
                  {inquireTag}
                </span>
                <div>
                  {inquireView}
                </div>
              </div>
            </div>
            
          </div>
          <div className="detail-body">
            <span
            className="desc"
            dangerouslySetInnerHTML={{ __html: inquireDesc }} />
          </div>
        </div>
        )}

        
        <div className="detail-btn-wrap">
          <Button className="back-btn btn" onClick={() => history.goBack()}>목록으로 이동</Button>
          
          {(Array.isArray(likeInfo) && likeInfo.length < 1)  && [
            <Button key="recommendZeroBtn" className={`like-btn btn`} onClick={() => handleLike()}>
              <FontAwesomeIcon className="i" icon={faThumbsUp} />
              <p>좋아요</p>
              <span>0</span>
            </Button>
          ]}

          {(Array.isArray(likeInfo) && likeInfo.length > 0)  && [
            <Button key="recommendBtn" className={`${currentUser && likeInfo[0].userInfo.includes(currentUser.id) ? 'like-btn btn isLike' : 'like-btn btn'}`} onClick={() => handleLike()}>
              <FontAwesomeIcon className="i" icon={faThumbsUp} />
              <p>좋아요</p>
              <span>{likeInfo[0].likeCount}</span>
            </Button>
          ]}               
          
        </div>
        <div className="inquire-detail-comment-wrapper">
          <div className="inquire-detail-comment-wrapper--header">
            {(Array.isArray(messageRoomData) && messageRoomData.length > 0) && [
                <p key="messageEx">댓글 {inquireComment.messageRoomData.length}개</p>
            ]}
            {(Array.isArray(messageRoomData) && messageRoomData.length < 1) && [
                <p key="messageNone">등록된 댓글이 없습니다</p>
            ]}
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