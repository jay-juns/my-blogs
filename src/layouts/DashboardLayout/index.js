import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutUserStart } from '../../redux/User/user.actions';

import Header from './../../components/Header';
import Footer from './../../components/Footer';
import VerticalNav from './../../components/verticalNav';
import Button from './../../components/Forms/Button';
import ConfirmModal from './../../components/Modals/ConfirmModal';

const DashBoardLayout = props => {
  const dispatch = useDispatch();
  const [hideModal, setHideModal] = useState(true);
  const [modalType, setModalType] = useState('');

  const toggleModal = (type) =>{
    setHideModal(!hideModal);
    setModalType(type);
  }
  const configModal = {
    hideModal,
    modalType,
    toggleModal
  };

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(signOutUserStart());
  };
  
  return (
    <div id="fullMain" className="dashboardLayout">
      <Header {...props} />
      
      <ConfirmModal {...configModal} key="confirm-modal">
        <form onSubmit={handleSubmit}>
          <p>로그아웃을 하시겠습니까?</p>
          <div className="confirm-modal--btn-wrap">
            <Button className="btn" onClick={() => toggleModal()}> 
              취소
            </Button>
            <Button className="confirm-modal--ent-btn btn" type="submit">
              로그아웃
            </Button> 
          </div>
        </form>
      </ConfirmModal>
      
      <main className="control-panal">
        <aside className="side-bar">
          <VerticalNav>
            <NavLink 
            to="/dashboard"
            exact 
            activeClassName="active-dashboard"
            className="link-dashboard"
            >
              프로필 정보
            </NavLink>
            <NavLink 
            to="/dashboard/friends"
            activeClassName="active-dashboard"
            className="link-dashboard"
            >
              친구 목록
            </NavLink>
            <Button className="sign-out btn" onClick={() => toggleModal('confirmModal')}>
              로그아웃
            </Button>
          </VerticalNav>
          <span className="with-draw">
            회원탈퇴
          </span>
        </aside>
        <section className="content">
          {props.children}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default DashBoardLayout;