import React, { useState } from 'react';
import SliderMain from '../Slider/sliderMain';
import MainContent from './mainContent';
import Modal from './../Forms/Modal';


const Main = props => {
  
  const [hideModal, setHideModal] = useState(false);
  const toggleModal = () => setHideModal(!hideModal);

  const configModal = {
    hideModal,
    toggleModal
  };
  
  return (
    <div className="main-wrap">

      <Modal {...configModal} key="mainModal">
        <div className="ex-wrapper">
          <h3>📢 주의 사항</h3>
          <p>1. 포트폴리오용으로 제작된 임시 웹사이트입니다. 언제든지 폐쇄 될 수 있음을 알려드립니다.</p>
          <p>2. 회원가입은 오직 테스트 목적으로만 사용합니다.</p>
          <p>3. 테스트 목적으로 회원가입시 본인이 현재 사용하는 이메일이 아닌 가짜 이메일로 가입하는 걸 권유합니다. <strong> 예시: test@test.com</strong></p>
          <p>4. 작성된 글, 계정은 이유 없이 즉시 삭제 될 수 있음을 양해부탁드립니다.</p>
          <p>5. 버그 및 오류, 추가 기능들은 현재까지도 작업중입니다.</p>
          <p> 주소: <a href="https://github.com/jay-juns">바로가기</a></p>
        </div>
      </Modal> 
      

      <SliderMain />
      <div className="main-contents">
        <MainContent />
      </div>
    </div>
  );
};

export default Main;