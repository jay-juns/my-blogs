import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import moment from 'moment';
import 'moment/locale/ko';

import BlogCardDummy from './../BlogCardDummy';
import ConfirmModal from './../../Modals/ConfirmModal';

import { fetchContentStart, deleteContentStart } from '../../../redux/Contents/contents.actions';
import { checkUserIsAdmin } from './../../../Utils';

import Button from './../../Forms/Button';

import './styles.scss';

const mapState = ({ contentsData, user }) => ({
  content: contentsData.content,
  currentUser: user.currentUser
})

const BlogCard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { blogID } = useParams(); 
  const [hideModal, setHideModal] = useState(true);
  const [modalType, setModalType] = useState('');
  const [isPending, setIsPending] = useState(false);
  const { content, currentUser } = useSelector(mapState);
  const {
    author,
    contentDesc,
    contentThumbnail,
    createdDate,
    contentTitle
  } = content;

  const toggleModal = (type) =>{
    setHideModal(!hideModal);
    setModalType(type);
  };
  
  const cofirmConfigModal = {
    hideModal,
    modalType,
    toggleModal
  };
  
  const timeNow = createdDate ? createdDate.toDate().toString() : null;
  const nowTime = moment(timeNow).fromNow();
  const isAdmin = checkUserIsAdmin(currentUser);

  useEffect(() => {
    dispatch(
      fetchContentStart(blogID)
    )
    setTimeout(() => {
      setIsPending(true);  
    }, 200)
  }, [dispatch, blogID]);

  const handleDeleteSubmit = e => {
    e.preventDefault();

    dispatch(
      deleteContentStart(blogID)
    )

    history.goBack()
  }

  return (
    <div className="content-main">
      <Helmet>
        <title> 블로그 상세 페이지 - My Blogs</title>
      </Helmet>
      {!isPending && (
        <BlogCardDummy />
      )}
      {isPending && (
        <div className="content-box" key="blog-main-content">
          <div className="content-head">
            <div className="content-name">
              <p>{author}</p>
            </div>
            <div className="content-head-time">
              <span>{nowTime}</span>
            </div>
          </div>
          <div className="content-body">
            <div className="content-body-thumbnail">
            <img src={contentThumbnail} alt="img" /> 
            </div>
            <div className="content-body-title">
              <p>
                {contentTitle}
              </p>
            </div>
            <div className="content-body-text">
              <span
              className="desc"
              dangerouslySetInnerHTML={{ __html: contentDesc }} />
            </div>
          </div>
          { isAdmin && 
            <ConfirmModal {...cofirmConfigModal} key="confirm-blog-modal">
            <form onSubmit={handleDeleteSubmit}>
              <p>블로그 글을 삭제하시겠습니까?</p>
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
          }

          { isAdmin && 
            <div className="show-del-btn-wrap" key="delete-blog-btn">
              <Button className="btn" onClick={() => toggleModal('confirmModal')}>
                삭제
              </Button>
          </div>
          }
        </div>
      )}
    </div>
  );
}

export default BlogCard;
