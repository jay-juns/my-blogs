import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addInquiresStart, fetchInquiresStart } from './../../redux/Inquires/inquires.actions';
import { fetchInquireComments, setInquireComments } from './../../redux/Comments/InquireComments/InquireComments.actions';

import CKEditor from 'ckeditor4-react';
import FormInput from '../Forms/FormInput';
import FormSelect from '../Forms/FormSelect';
import Button from '../Forms/Button';
import Modal from '../Forms/Modal';
import Alert from '../Alert';

import InquireItem from './InquireItem';
import Pagination from './InquirePagination';

import './styles.scss';

const mapState = ({ inquiresData, user, messages }) => ({
  inquires: inquiresData.inquires,
  currentUser: user.currentUser,
  inquireComments: messages.inquireComments
})

const InquireBoard = ({}) => {
  const { inquires, currentUser, inquireComments } = useSelector(mapState);
  const dispatch = useDispatch();
  const history = useHistory();
  const { inquireType } = useParams();
  const [hideModal, setHideModal] = useState(true);
  const [inquireDesc, setInquireDesc] = useState('');
  const [inquireTag, setInquireTag] = useState('제안');
  const [inquireTitle, setInquireTitle] = useState('');
  const [hideAlert, setHideAlert] = useState(false);

  let userInfo = [];
  
  for (let name in currentUser) { 
    if (name.includes('displayName')) {
      userInfo.push(currentUser.displayName); 
    }
  }

  const [displayName, setDisplayName] = useState(userInfo[0]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(11);

  const { data } = inquires;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = (Array.isArray(data) && data.length > 0) && data.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(
      fetchInquiresStart({ inquireType })
    )
  }, [inquireType]);

  useEffect(() => {
    dispatch(
      fetchInquireComments()
    )

    return () => {
      dispatch(
        setInquireComments({})
      )
    }
  }, []);

  const toggleModal = () => setHideModal(!hideModal);

  const configModal = {
    hideModal,
    toggleModal
  };

  const resetForm = () => {
    setHideModal(true);
    setInquireTag('제안');
    setInquireTitle('');
    setInquireDesc('');
    setDisplayName(userInfo[0]);
  };
  
  const handleSubmit = e => {
    e.preventDefault();

    if(inquireTitle === '' || inquireDesc === '') {
      setTimeout(() => {
        setHideAlert(true);
      }, 30);
      return setHideAlert(false); 
    }

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
    },
    {
      name: "기타",
      value: "기타"
    }],
    handleChange: handleFilter
  };

  const configAlert = {
    text: '제목과 내용을 채워 주세요',
    color: 'danger',
    hideAlert: hideAlert
  }; 

  return (
    <div className="inquire-board">
      <div className="inquire-title">
        <h3>문의 게시판</h3>
      </div>
      <div className="inquire-contents">
      {hideAlert && <Alert {...configAlert} key="inquireWrite"/>}
        
        <FormSelect {...configFilter} />

        <Button className="inquire-write-btn btn" onClick={() => toggleModal()}>
          글쓰기
        </Button>
      </div>

      {currentUser && [
        <Modal {...configModal} key="inquireModal">
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
              }, {
                name: "기타",
                value: "기타"
              }]}
              handleChange={e => setInquireTag(e.target.value)}
            />
              
            <FormInput   
              label="필명"
              formClass="hide"
              type="text"
              disabled="disabled" 
              value={userInfo[0]}
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
              <Button id="inquireWriteBtn" className="ent-btn btn" type="submit">
                글쓰기
              </Button> 
            </div>
          </form>
        </Modal>
      ]}

      {!currentUser && [
        <Modal {...configModal} key="inquireUnModal">
          글을 작성 하려면 먼저 로그인을 해야 합니다.
        </Modal>
      ]}

      <div className="show-item-world-wrap">
        <div className="show-row">
          <div className="show-item-wrap--head">
            <div className="show-item-header-title">
              <p>
                추천수
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
                <span className="show-title-day--head">
                  일시
                </span>
              </div>
                            
            </div>  
          </div>
        </div>

        {(Array.isArray(data) && data.length > 0) && currentPosts.map((inquire) => {
          const {
            inquireTitle,
            documentID,
            displayName,
            inquireTag,
            createdDate
          } = inquire;
          
          if(!inquireTitle) return null;

          let comLengResult = [];

          if(Array.isArray(inquireComments.messageData) && inquireComments.messageData.length > 0 ) {
            inquireComments.messageData.forEach((el) => {
              comLengResult.push(el.id);
            })
          }
          
          const configInquireContent = {
            inquireTitle,
            documentID, 
            displayName,
            inquireTag,
            createdDate,
            comLengResult
          };     

          return (
            <div className="show-row" key={documentID}>  
              <InquireItem
              {...configInquireContent}
               />            
            </div>
          )
        })}       

      </div>
      {
        ((Array.isArray(data)) && [
          <Pagination 
            postsPerPage={postsPerPage}
            totalPosts={data.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        ])
      }  
      
    </div>
  );
}

export default InquireBoard;