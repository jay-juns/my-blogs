import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addInquiresStart, fetchInquiresStart, deleteInquireStart  } from './../../redux/Inquires/inquires.actions';
import { checkUserIsAdmin } from './../../Utils';

import CKEditor from 'ckeditor4-react';
import FormInput from '../Forms/FormInput';
import FormSelect from '../Forms/FormSelect';
import Button from '../Forms/Button';
import Modal from '../Forms/Modal';

import InquireItem from './InquireItem';

import './styles.scss';

const mapState = ({ inquiresData, user }) => ({
  inquires: inquiresData.inquires,
  currentUser: user.currentUser
})

const InquireBoard = ({}) => {
  const { inquires } = useSelector(mapState);
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  const history = useHistory();
  const { inquireType } = useParams();
  const [hideModal, setHideModal] = useState(true);
  const [inquireDesc, setInquireDesc] = useState('');
  const [inquireTag, setInquireTag] = useState('의견');
  const [inquireTitle, setInquireTitle] = useState('');
  const [displayName, setDisplayName] =useState(currentUser ? currentUser.displayName : null);
  const { data } = inquires;
  const isAdmin = checkUserIsAdmin(currentUser);

  useEffect(() => {
    dispatch(
      fetchInquiresStart({ inquireType })
    )
  }, [inquireType]);

  const toggleModal = () => setHideModal(!hideModal);

  const configModal = {
    hideModal,
    toggleModal
  };

  const resetForm = () => {
    setHideModal(true);
    setInquireTag('의견');
    setInquireTitle('');
    
    setInquireDesc('');
    setDisplayName(currentUser.displayName);
  };
  
  const handleSubmit = e => {
    e.preventDefault();

    dispatch(
      addInquiresStart({
        inquireTag,
        inquireTitle,
        inquireDesc,
        displayName
        
      })
    );
    resetForm();
  };

  const handleFilter = (e) => {
    const nextFilter = e.target.value;
    history.push(`/inquire/${nextFilter}`);
  };

  const configFilter = {
    defaultValue: inquireType,
    options: [{
      name: "전체",
      value: ""
    },
    {
      name: "제안",
      value: "제안"
    },
    {
      name: "의견",
      value: "의견"
    }],
    handleChange: handleFilter
  };

  return (
    <div className="inquire-board">
      <div className="inquire-title">
        <h3>문의 게시판</h3>
      </div>
      <div className="inquire-contents">
        
        <FormSelect {...configFilter} />

        <Button className="inquire-write-btn" onClick={() => toggleModal()}>
          글쓰기
        </Button>
      </div>

      {currentUser && [
        <Modal {...configModal}>
          <form onSubmit={handleSubmit}>
            <h2>새로운 글쓰기</h2>

            <FormSelect 
              label="태그 선택"
              options={[{
                name: "제안",
                value: "제안"               
              }, {
                name: "의견",
                value: "의견"
              }]}
              handleChange={e => setInquireTag(e.target.value)}
            />
         
            <FormInput {...currentUser}
              label="필명"
              formClass="hide"
              type="text"
              disabled="disabled" 
              value={displayName}
              handleChange={e => setDisplayName(e.target.value)}
            />

            <FormInput 
              label="제목"
              formClass="modal-items"
              type="text"
              value={inquireTitle}
              handleChange={e => setInquireTitle(e.target.value)}
            />  

            <CKEditor
              onChange={evt => setInquireDesc(evt.editor.getData())}
            />

            <div className="btn-wrap">
              <Button className="ent-btn" type="submit">
                글쓰기
              </Button> 
            </div>
          </form>
        </Modal>
      ]}

      {!currentUser && [
        <Modal {...configModal}>
          글을 작성 하려면 먼저 로그인을 해야 합니다.
        </Modal>
      ]}

      <div className="show-item-world-wrap">
        <div className="show-row">
          <div className="show-item-wrap--head">
            <div className="show-item-header-title">
              <p>
                No
              </p>
            </div>

            <div className="show-text--head">
              <div className="show-title--head">
              <p className="show-tag--head">
                Tag
              </p>
                <p className="show-titie-first--head">
                  제목
                </p>
                <p className="show-title-nick--head">
                  작성자
                </p>
                <span>
                  일시
                </span>
              </div>
                            
            </div>  
          </div>
        </div>

        {(Array.isArray(data) && data.length > 0) && data.map((inquire, index) => {
          const {
            inquireTitle,
            documentID,
            displayName,
            inquireTag,
            createdDate
          } = inquire;
          
          
          if(!inquireTitle) return null;

          const configInquireContent = {
            inquireTitle,
            documentID, 
            displayName,
            inquireTag,
            createdDate,
            index
          };

          return (
            <div className="show-row" key={index}> 

              <InquireItem {...configInquireContent} />                  

              {isAdmin && [
                <div className="show-del-btn-wrap">
                  <Button onClick={() => dispatch(deleteInquireStart(documentID))}>
                    삭제
                  </Button>
              </div>
              ]}
              {!isAdmin && [
                <div className="hide">
                </div>
              ]} 
            </div>
          )
        })}  
        
      </div>
    </div>
  );
}

export default InquireBoard;