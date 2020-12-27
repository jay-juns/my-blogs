import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { fetchInquireStart, setInquire, updateInquire, deleteInquireStart } from './../../../redux/Inquires/inquires.actions';

import CKEditor from 'ckeditor4-react';

import Button from './../../Forms/Button';
import Modal from './../../Forms/Modal';
import FormInput from './../../Forms/FormInput';
import FormSelect from './../../Forms/FormSelect';

import './styles.scss';

const mapState = state => ({
  inquire: state.inquiresData.inquire
})

const InquireCard = ({}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { inquireID } = useParams();
  const { inquire } = useSelector(mapState);
  const [hideModal, setHideModal] = useState(true);
  const {
    inquireTitle,
    displayName,
    inquireTag,
    inquireDesc,
    documentID
  } = inquire;

  const [inquireEditTitle, setinquireEditTitle] = useState('');
  const [inquireEditDesc, setinquireEditDesc] = useState(inquireDesc);

  const resetForm = () => {
    setHideModal(true);
    setinquireEditTitle('');
    setinquireEditDesc(inquireDesc);
  };


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
        inquireTag,
        inquireTitle: inquireEditTitle,
        inquireDesc: inquireEditDesc,
        displayName,
        id: documentID
      })
    );
    resetForm();
  };


  return(
    <div className="detail-wrap">
      <div className="detail-head-title">
        <h3>문의 내용</h3>
      </div>
      <div className="detail-container">
        <div className="detail-header"> 
          <div className="detail-header-left">
            <div>
              <p className="detail-title">{inquireTitle}</p> 
              <p className="detail-displayName">{displayName} <strong>님</strong></p>
            </div>
            <div>
              <Button onClick={() => toggleModal()}>수정하기</Button>
              <Button onClick={() => dispatch(deleteInquireStart(documentID))}>
                삭제
              </Button> 
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
    </div>
  );
}

export default InquireCard;