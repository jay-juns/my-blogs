import React, { useState, useEffect } from 'react';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addContentsStart, fetchContentsStart, deleteContentStart } from './../../../redux/Contents/contents.actions';
import CKEditor from 'ckeditor4-react';
import Modal from './../../Forms/Modal';
import FormInput from './../../Forms/FormInput';
import FormSelect from './../../Forms/FormSelect';
import Button from './../../Forms/Button';

const mapState = ({ contentsData }) => ({
  contents: contentsData.contents
})

const BlogMain = props => {
  const { contents } = useSelector(mapState);
  const dispatch = useDispatch();
  const [hideModal, setHideModal] = useState(true);
  const [contentTag, setContentTag] = useState('잡담');
  const [contentTitle, setContentTitle] = useState('');
  const [contentThumbnail, setContentThumbnail] = useState('');
  const [contentDesc, setContentDesc] = useState('');

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
    setContentTag('잡담');
    setContentTitle('');
    setContentThumbnail('');
    setContentDesc('');
  };

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(
      addContentsStart({
        contentTag,
        contentTitle,
        contentThumbnail,
        contentDesc
      })
    );
    resetForm();

  };



  return (
    <div className="blog-main-wrap">
      <Button onClick={() => toggleModal()}>
        글쓰기
      </Button>

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
              type="text"
              value={contentTitle}
              handleChange={e => setContentTitle(e.target.value)}
            />

            <FormInput 
              label="이미지"
              type="url"
              value={contentThumbnail}
              handleChange={e => setContentThumbnail(e.target.value)}
            />

            <CKEditor
              onChange={evt => setContentDesc(evt.editor.getData())}
            />

            <Button type="submit">
              생성하기
            </Button>
          </form>
        </div>
      </Modal>

      <div className="show-contents">
         <div>
            {contents.map((content, index) => {
              const {
                contentTitle,
                contentThumbnail,
                contentDesc,
                documentID
              } = content;

              return (
                <div>
                  <div>
                    <img src={contentThumbnail} alt="img" />
                  </div>
                  <div>
                    <div>
                      {contentTitle}
                    </div>
                    <div>
                      <p
                        dangerouslySetInnerHTML={{ __html: contentDesc }}
                      />
                    </div>
                    <Button onClick={() => dispatch(deleteContentStart(documentID))}>
                      삭제
                    </Button>
                  </div>
                </div>
              )
            })}  
         </div>
      </div>        

    </div>
  );
};

export default BlogMain;
