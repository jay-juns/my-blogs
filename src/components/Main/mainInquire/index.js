import React, { useEffect, useState  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchInquiresMainStart } from './../../../redux/Inquires/inquires.actions';
import MainInquireItem from './../mainInquireItem';

import { faThLarge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles.scss'

const mapState = ({ inquiresData }) => ({
  inquires: inquiresData.inquires
})

const MainInquire = () => {
  const dispatch = useDispatch();
  const { inquires } = useSelector(mapState);
  const { data } = inquires;
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    dispatch(
      fetchInquiresMainStart()
    )
    setTimeout(() => {
      setIsPending(true);
    }, 200);
  }, [dispatch]);

  const configMainInquire = {
    data
  };

  return (
    <div className="main-inquire">
      
      <div className="main-inquire-add-btn-wrapper">
        <Link className="inquire-add-btn" to={'/inquirePage=/1'}>
        <FontAwesomeIcon className="i" icon={faThLarge} />
          <span>모두 보기</span>
        </Link>
      </div>
      <div className="main-inquire-items-header">
        <div className="main-inquire-items-header-recommend">추천수</div>
        <div className="main-inquire-items-header-tag">Tag</div>
        <div className="main-inquire-items-header-title">제목</div>
        <div className="main-inquire-items-header-name">작성자</div>
        <div className="main-inquire-items-header-day">일시</div>
      </div>
      {!isPending && (
        <div className="main-inquire-items" key="inquire-dummy-items">
          <div className="main-inquire-items-container">
            
            <div className="main-inquire-items-recommend"></div>
            <div className="main-inquire-items-tag">
              <p className="main-inquire-items-tag--name">
                <span className="main-inquire-items-tag--name-span"></span>
              </p>
            </div>
            <div className="main-inquire-items-title">
              <p className="main-inquire-items-title--contents"></p>
              
            </div>
            <div className="main-inquire-items-name"></div>
              
            
          </div>
          <div className="main-inquire-items-container">
            
            <div className="main-inquire-items-recommend"></div>
            <div className="main-inquire-items-tag">
              <p className="main-inquire-items-tag--name">
                <span className="main-inquire-items-tag--name-span"></span>
              </p>
            </div>
            <div className="main-inquire-items-title">
              <p className="main-inquire-items-title--contents"></p>
              
            </div>
            <div className="main-inquire-items-name"></div>
              
            
          </div>
          <div className="main-inquire-items-container">
            
            <div className="main-inquire-items-recommend"></div>
            <div className="main-inquire-items-tag">
              <p className="main-inquire-items-tag--name">
                <span className="main-inquire-items-tag--name-span"></span>
              </p>
            </div>
            <div className="main-inquire-items-title">
              <p className="main-inquire-items-title--contents"></p>
              
            </div>
            <div className="main-inquire-items-name"></div>
              
            
          </div>
          <div className="main-inquire-items-container">
            
            <div className="main-inquire-items-recommend"></div>
            <div className="main-inquire-items-tag">
              <p className="main-inquire-items-tag--name">
                <span className="main-inquire-items-tag--name-span"></span>
              </p>
            </div>
            <div className="main-inquire-items-title">
              <p className="main-inquire-items-title--contents"></p>
              
            </div>
            <div className="main-inquire-items-name"></div>
              
            
          </div>
        </div>
      )}
      {isPending && (
        <MainInquireItem {...configMainInquire}/>
      )}
    </div>
  );
};

export default MainInquire;