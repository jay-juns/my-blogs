import React, { useState, useEffect } from 'react';
import { Link  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addContentsData, fetchContentsStart } from './../../../redux/Contents/contents.actions';

import Button from './../../Forms/Button';
import Modal from './../../Forms/Modal';
import FormInput from './../../Forms/FormInput';
import CKEditor from 'ckeditor4-react';

import './styles.scss';

const mapState = ({ contentsData, user }) =>({
  contents: contentsData.contents,
  currentUser: user.currentUser
});

const BlogItems = props => {
  const { contents, currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  const [hideModal, setHideModal] = useState(true);

  const [contentThumbnail, setContentThumbnail] = useState('');
  const [contentTitle, setContentTitle] = useState('');
  const [contentDesc, setContentDesc] = useState('');

  // const { data } = contents;

  useEffect(() => {
    dispatch(
      fetchContentsStart()
    );
  }, []);


  const toggleModal = () => setHideModal(!hideModal);

  const configModal = {
    hideModal,
    toggleModal
  };

  const resetForm = () => {
    setHideModal(true);
    setContentThumbnail('');
    setContentTitle('');
    setContentDesc('');
  }

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(
      addContentsData({
        contentThumbnail,
        contentTitle,
        contentDesc
      })
    );
    resetForm();
  }

  return (
    <div className="blog-contents-wrap">
      <div className="blog-head-area">
        <Button onClick={() => toggleModal()}>
          글쓰기
        </Button>
        <h2>전체 글</h2> 
      </div>
      {currentUser &&[
        <Modal {...configModal}>
        <div className="modal-contents">
          <div className="modal-contents--header">
            <h3>등록하기</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <FormInput
              formClass = "form-blogs"
              label="제목 입력"
              type="txet"
              value={contentTitle}
              handleChange={e => setContentTitle(e.target.value)}
            />

            <FormInput
              formClass = "form-blogs"
              label="이미지 주소 입력"
              type="url"
              value={contentThumbnail}
              handleChange={e => setContentThumbnail(e.target.value)}
            />

            <p>내용 작성하기</p>  

            <CKEditor
              onChange={evt => setContentDesc(evt.editor.getData())}
              config={{
                extraAllowedContent: 'div(*)',
                allowedContent: true
             }}
            />

            <Button className="blog-ok-btn" type="submit">
              완료
            </Button>
          </form>
        </div>
      </Modal>
      ]}
      {!currentUser && [
        <Modal {...configModal}>
          <p>로그인을 해야 글을 작성할 수 있습니다.</p>
          <Link
           to="/login"
           className="login-link-btn"
          >
            로그인 하러 가기
          </Link>
        </Modal>
      ]}
      
      <div className="contents-wrap">
        {contents.map((content, index) => {
          const {
            contentTitle,
            contentThumbnail,
            contentDesc
          } = content;

          return (
            <div 
              key={index}
              className="contents-wrap-items"
            >
              <div className="contents-wrap-thumb">
                <img className="thumb" src={contentThumbnail} />
              </div>
              <div className="contents-wrap-text">
                <div>
                  <h4>{contentTitle}</h4>
                </div>
                <div>
                  <p
                    dangerouslySetInnerHTML={{ __html: contentDesc }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default BlogItems;
