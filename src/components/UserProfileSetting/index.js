import React from 'react';
import './styles.scss';

import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from './../Forms/Button';
import FormInput from './../Forms/FormInput';

const UserProfileSetting = props => {

  return (
    <div className="user-profile-setting">
      <div className="profile-wrapper">
        <h3>프로필 사진</h3>
        <div className="profile-contents">
          <div className="profile-img">
            <span className="img-wrap">
              <FontAwesomeIcon className="i" icon={faUser} />
            </span>
          </div>
          <div className="profile-left-menu">
            <Button className="update-btn">
              프로필 사진 업데이트
            </Button>
            <span>10MB 이내의 JPEG, PNG, GIF 형식이어야 합니다</span>
          </div>
        </div> 
      </div>

      <div className="profile-wrapper">
        <h3>프로필 설정</h3>
        <span className="sub-text">
          계정의 세부 정보 식별 변경
        </span>
        <div className="profile-contents column">
          <div className="profile-item">
            <div className="profile-item-title">
              사용자 이름
            </div>
            <div className="profile-modify">
              <FormInput 
                type="text"
              />
              <span className="modify-sub-text">
                닉네임을 변경이 가능합니다. My Blogs 이용규약을 위반한 사용자 이름은 계정이 영구정지될 수 있으니 주의하세요.
              </span>
            </div>  
          </div>
          <div className="profile-item">
            <div className="profile-item-title">
              자기소개
            </div>
            <div className="profile-modify">
              <textarea></textarea>
              <span className="modify-sub-text">
                자기소개는 300자 미만이어야 합니다.
              </span>
            </div>
          </div>
          
          <div className="save-btn-wrap">
            <Button className="save-btn">
              변경사항 저장하기
            </Button>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default UserProfileSetting;