import React, { useState, useEffect } from 'react';
import './styles.scss';
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

const mapState = ({ inquiresData, user }) => ({
  inquires: inquiresData.inquires,
  currentUser: user.currentUser
})

const InquireBoard = props => {
  const { inquires } = useSelector(mapState);
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  const history = useHistory();
  const [hideModal, setHideModal] = useState(true);
  const { inquireType } = useParams();
  const [inquireDesc, setInquireDesc] = useState('');
  const [createdDate, setCreateDate] = useState('');
  const [inquireTag, setInquireTag] = useState('suggest');
  const [inquireTitle, setInquireTitle] = useState('');
  const [displayName, setDisplayName] =useState(currentUser ? currentUser.displayName : null);
  const { data } = inquires;
  const isAdmin = checkUserIsAdmin(currentUser);

  useEffect(() => {
    dispatch(
      fetchInquiresStart({ inquireType })
    );
    
  }, [inquireType]);

  const toggleModal = () => setHideModal(!hideModal);

  const configModal = {
    hideModal,
    toggleModal
  };

  const resetForm = () => {
    setHideModal(true);
    setInquireTag('suggest');
    setInquireTitle('');
    setCreateDate('');
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
        displayName,
        createdDate
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
      value: "suggest"
    },
    {
      name: "의견",
      value: "opinion"
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

        <Button onClick={() => toggleModal()}>
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
                value: "suggest"               
              }, {
                name: "의견",
                value: "opinion"
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
          <div className="show-item-wrap">
            <div className="show-item-header-title">
              <p>
                No
              </p>
            </div>

            <div className="show-text">
              <div className="show-title">
                <p className="show-titie-first">
                  제목
                </p>
                <p>
                  필명
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
            textID,
            createdDate,
            displayName
          } = inquire;
          
          
          if(!inquireTitle) return null;


          const configInquireContent = {
            inquireTitle,
            createdDate,
            displayName,
            index
          };


          return (
            <div className="show-row" key={index}> 

              <InquireItem {...configInquireContent} />                  

              {isAdmin && [
                <div className="show-del-btn-wrap">
                  <Button onClick={() => dispatch(deleteInquireStart(textID))}>
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