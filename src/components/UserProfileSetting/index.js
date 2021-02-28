import React from 'react';

import { Helmet } from 'react-helmet-async';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from './../Forms/Button';
import FormInput from './../Forms/FormInput';
import FormUploadInput from './../Forms/FormUploadInput';

import './styles.scss';

const UserProfileSetting = props => {
  const { currentUser } = props;
  const { displayName, color, userImgUrl } = currentUser;
  const userStyleColor = userImgUrl ? {
    backgroundColor: 'transparent',
    position: 'relative',
    width: '50px',
    height: '50px',
    overflow: 'hidden'
  } : { backgroundColor: color };
  const userLogo = userImgUrl ?<img src={`${userImgUrl}`} alt="userLogo" /> : <FontAwesomeIcon className="i" icon={faUser} />;

  return (
    <>
      <Helmet>
        <title> {displayName} - My Blogs</title>
      </Helmet>
      <article className="user-profile-setting">
        <div className="profile-wrapper">
          <h3>프로필 사진</h3>
          <div className="profile-contents">
            <div className="profile-img">
              <span className="img-wrap" style={userStyleColor}>
                {userLogo}
              </span>
            </div>
            <div className="profile-left-menu">
              <FormUploadInput />
              <span>10MB 이내의 JPEG, PNG 형식이어야 합니다</span>
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
                별명
              </div>
              <div className="profile-modify">
                <FormInput 
                  type="text"
                  placeholder={displayName}
                />
                <span className="modify-sub-text">
                  별명은 변경이 가능합니다. My Blogs 이용규약을 위반한 별명은 계정이 영구정지될 수 있으니 주의하세요.
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
      </article>
    </>
  );
}

export default UserProfileSetting;