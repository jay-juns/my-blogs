import React, { useState, useEffect } from 'react';
import './styles.scss';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { addContentsStart, fetchContentsStart, deleteContentStart } from './../../../redux/Contents/contents.actions';
import { checkUserIsAdmin } from './../../../Utils';

import CKEditor from 'ckeditor4-react';
import Modal from './../../Forms/Modal';
import FormInput from './../../Forms/FormInput';
import FormSelect from './../../Forms/FormSelect';
import Button from './../../Forms/Button';
import LoadMore from './../../LoadMore';

const mapState = ({ contentsData, user }) => ({
  contents: contentsData.contents,
  currentUser: user.currentUser
})

const BlogMain = props => {
  const { contents } = useSelector(mapState);
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  const history = useHistory();
  const { filterType } = useParams();
  const [hideModal, setHideModal] = useState(true);
  const [contentTag, setContentTag] = useState('잡담');
  const [contentTitle, setContentTitle] = useState('');
  const [contentThumbnail, setContentThumbnail] = useState('');
  const [contentDesc, setContentDesc] = useState('');
  const [createdDate, setCreateAt] = useState(toString());
  const { data, queryDoc, isLastPage } = contents;
  const isAdmin = checkUserIsAdmin(currentUser);

  useEffect(() => {
    dispatch(
      fetchContentsStart({ filterType })
    );
    
  }, [filterType]);
  
  const toggleModal = () => setHideModal(!hideModal);

  const configModal = {
    hideModal,
    toggleModal
  };

  const resetForm = () => {
    setHideModal(true);
    setContentTag('잡담');
    setContentTitle('');
    setContentThumbnail('');
    setContentDesc('');
    setCreateAt('');
  };

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(
      addContentsStart({
        contentTag,
        contentTitle,
        contentThumbnail,
        contentDesc,
        createdDate
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
      name: '전체',
      value: ''
    },
    {
      name: '잡담',
      value: 'chat'
    },
    {
      name: '정보',
      value: 'info'
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

  return (
    <div className="blog-main-wrap">
      <Button className="write-btn" onClick={() => toggleModal()}>
        글쓰기
      </Button>

      <FormSelect {...configFilter} />
      {currentUser && [
        <Modal {...configModal}>
          <div className="modal-wrap">
            <form onSubmit={handleSubmit}>
              <h2>새로운 글쓰기</h2>
              <FormSelect 
                label="태그 선택"
                options={[{
                  value: "잡담",
                  name: "잡담"                
                }, {
                  value: "정보",
                  name: "정보"
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
                <Button className="ent-btn" type="submit">
                  생성하기
                </Button> 
              </div>
            </form>
          </div>
        </Modal>
      ]}

      {!currentUser && [
        <Modal {...configModal}>
          글을 작성 하려면 먼저 로그인을 해야 합니다.
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
                createdDate
              } = content;

              return (
                <div className="show-row" key={index}>
                  <div className="show-img">
                    <img src={contentThumbnail} alt="img" />
                  </div>
                  <div className="show-text">
                    <div className="show-title">
                      <p className="show-titie-first">{contentTitle}</p>
                      <p
                        dangerouslySetInnerHTML={{ __html: contentDesc }}
                      />
                      <span>
                        {moment(createdDate.toDate().toString()).format('YYYY-MM-DD')}
                      </span>
                    </div>
                    {isAdmin && [
                      <div className="show-del-btn-wrap" key={index}>
                        <Button onClick={() => dispatch(deleteContentStart(documentID))}>
                          삭제
                        </Button>
                    </div>
                    ]}
                    {!isAdmin && [
                      <div key={index}>
                      </div>
                    ]}                    
                  </div>
                </div>
              )
            })}  
         </div>
      </div>        

      {!isLastPage && (
        <LoadMore {...configLoadMore} />
      )}    

    </div>
  );
};

export default BlogMain;
