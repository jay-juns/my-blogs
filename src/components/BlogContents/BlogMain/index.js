import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';

import { addContentStart, fetchContentsStart } from './../../../redux/Contents/contents.actions';

import BlogItem from './../BlogItem';
import CKEditor from 'ckeditor4-react';
import Modal from './../../Modals/Modal';
import FormInput from './../../Forms/FormInput';
import FormSelect from './../../Forms/FormSelect';
import Button from './../../Forms/Button';
import LoadMore from './../../LoadMore';
import Alert from './../../Alert';

import './styles.scss';

const mapState = ({ contentsData, user }) => ({
  contents: contentsData.contents,
  currentUser: user.currentUser
})

const BlogMain = () => {
  const { contents } = useSelector(mapState);
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  const history = useHistory();
  const { filterType } = useParams();
  const [hideModal, setHideModal] = useState(true);
  const [modalType, setModalType] = useState('');
  const [contentTag, setContentTag] = useState('잡담');
  const [contentTitle, setContentTitle] = useState('');
  const [contentThumbnail, setContentThumbnail] = useState('');
  const [contentDesc, setContentDesc] = useState('');
  const [createdDate, setCreateDate] = useState('');
  const [hideAlert, setHideAlert] = useState(false);
  const { data, queryDoc, isLastPage } = contents;

  let userInfo = [];
  
  for (let name in currentUser) { 
    if (name.includes('displayName')) {
      userInfo.push(currentUser.displayName); 
    }
  }

  useEffect(() => {
    dispatch(
      fetchContentsStart({ filterType })
    );
    
  }, [dispatch, filterType]);
  
  const toggleModal = (type) =>{
    setHideModal(!hideModal);
    setModalType(type);
  }
  const configModal = {
    hideModal,
    modalType,
    toggleModal
  };

  const resetForm = () => {
    setHideModal(true);
    setContentTag('잡담');
    setContentTitle('');
    setContentThumbnail('');
    setContentDesc('');
    setCreateDate('');
    setModalType('');
  };

  const handleSubmit = e => {
    e.preventDefault();

    if(contentTitle === '' || contentDesc === '' || contentThumbnail === '') {
      setTimeout(() => {
        setHideAlert(true);
      }, 30);
      return setHideAlert(false); 
    }

    dispatch(
      addContentStart({
        contentTag,
        contentTitle,
        contentThumbnail,
        contentDesc,
        createdDate,
        author: userInfo[0]
      })
    );
    resetForm();
  };

  const handleFilter = (e) => {
    const nextFilter = e.target.value;
    history.push(`/blog/${nextFilter}`);
  };

  const configFilter = {
    defaultValue: filterType,
    options: [{
      name: "전체",
      value: ""
    },
    {
      name: "잡담",
      value: "잡담"
    },
    {
      name: "정보",
      value: "정보"
    }],
    handleChange: handleFilter
  };

  const handleLoadMore = () => {
    dispatch(
      fetchContentsStart({ 
        filterType, 
        startAtferDoc: queryDoc,
        psersistContents: data 
      })
    );
  };

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  };

  const configAlert = {
    text: '제목과 이미지URL, 그리고 내용을 채워 주세요.',
    color: 'danger',
    position: 'leftLeft',
    hideAlert: hideAlert
  };

  return (
    <>
      <Helmet>
        <title>블로그 - My Blogs</title>
      </Helmet>
      <div className="blog-main-wrap">
        
        <div className="header-setting-wrap">
          {hideAlert && <Alert {...configAlert} key="blogWrite"/>}

          <FormSelect {...configFilter} />

          <Button className="write-btn btn" onClick={() => toggleModal('modal')}>
            글쓰기
          </Button>
        </div>
        
        {currentUser && [
          <Modal {...configModal} key="blog-modal">
            <form onSubmit={handleSubmit}>
              <h2>새로운 글쓰기</h2>
              <FormSelect 
                label="태그 선택"
                options={[{
                  name: "잡담",
                  value: "잡담"               
                }, {
                  name: "정보",
                  value: "정보"
                }]}
                handleChange={e => setContentTag(e.target.value)}
              />

              <FormInput 
                label="제목"
                formClass="modal-items"
                type="text"
                value={contentTitle}
                handleChange={e => setContentTitle(e.target.value)}
              />

              <FormInput 
                label="이미지"
                formClass="modal-items"
                type="url"
                value={contentThumbnail}
                handleChange={e => setContentThumbnail(e.target.value)}
              />


              <CKEditor
                onChange={evt => setContentDesc(evt.editor.getData())}
              />
              <div className="btn-wrap">
                <Button className="ent-btn btn" type="submit">
                  생성하기
                </Button> 
              </div>
            </form>
          </Modal>
        ]}

        {!currentUser && [
          <Modal {...configModal} key="blogUnLoginModal">
            <p className="un-login-text">글을 작성 하려면 먼저 로그인을 해야 합니다.</p>
          </Modal>
        ]}
        

        <div className="show-contents">
          <div className="show-container">
              {(Array.isArray(data) && data.length > 0) && data.map((content, index) => {
                const {
                  contentTitle,
                  contentThumbnail,
                  contentDesc,
                  documentID,
                  author,
                  createdDate
                } = content;

                if(!contentTitle) return null;

                const configBlogContent = {
                  contentTitle,
                  contentThumbnail,
                  contentDesc,
                  documentID,
                  author,
                  createdDate
                };

                return (
                  <div className="show-row" key={index}>

                    <BlogItem {...configBlogContent} key={index} />                  
                    
                  </div>
                )
              })}  
          </div>
        </div>        

        {!isLastPage && (
          <LoadMore {...configLoadMore} />
        )}    
      </div>
    </>
  );
};

export default BlogMain;