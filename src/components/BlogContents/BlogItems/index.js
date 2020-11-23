import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContentsData } from './../../../redux/Contents/contents.actions';

import Button from './../../Forms/Button';
import Modal from './../../Forms/Modal';
import FormInput from './../../Forms/FormInput';
import CKEditor from 'ckeditor4-react';

import './styles.scss';

// const mapState = ({ contentData }) =>({
//   contents: contentData.contents
// });

const BlogItems = props => {
  // const { contents } = useSelector(mapState);
  const dispatch = useDispatch();
  const [hideModal, setHideModal] = useState(true);

  const [contentThumbnail, setContentThumbnail] = useState('');
  const [contentTitle, setContentTitle] = useState('');
  const [contentDesc, setContentDesc] = useState('');

  // const { data } = contents;


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
    <div>
      <div>
        <Button onClick={() => toggleModal()}>
          글쓰기
        </Button>
      </div>
      <Modal {...configModal}>
        <div>
          <form onSubmit={handleSubmit}>
            <FormInput
              label="title"
              type="txet"
              value={contentTitle}
              handleChange={e => setContentTitle(e.target.value)}
            />

            <FormInput
              label="img URL"
              type="url"
              value={contentThumbnail}
              handleChange={e => setContentThumbnail(e.target.value)}
            />

            <CKEditor
              onChange={evt => setContentDesc(evt.editor.getData())}
            />

            <br />

            <Button type="submit">
              완료
            </Button>
          </form>
        </div>
      </Modal>
      <div>
        <h2>전체 글</h2>       
      </div>
      <div>
        <div>
        {/* {(Array.isArray(data) && data.length > 0) && data.map((content, index) => {
          const {
            contentTitle,
            contentThumbnail,
            contentDesc
          } = content;

          return (
            <div key={index}>
              <span>
                <img className="thumb" src={contentThumbnail} />
              </span>
              <span>
                {contentTitle}
              </span>
              <p>
                {contentDesc}
              </p>
              <span>
                <Button>
                  삭제
                </Button>
              </span>
            </div>
          )
        })} */}
        </div>
      </div>
 
    </div>
  );
};

export default BlogItems;
