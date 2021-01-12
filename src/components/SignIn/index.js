import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { emailSignInStart, googleSignInStart } from './../../redux/User/user.actions';

import './styles.scss';

import FormInput from '../Forms/FormInput';
import Button from '../Forms/Button';
import AuthWrapper from '../AuthWrapper';
import Alert from '../Alert';

import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userErr: user.userErr

});

const SignIn = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser, userErr } = useSelector(mapState);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hideAlert, setHideAlert] = useState(false);
  
  useEffect(() => {
    if (currentUser) {
      resetForm();
      if(history.length > 0) {
        history.goBack();
      } else {
        history.push('/');
      }
    }    

  }, [currentUser]);

  useEffect(() => {
    if(email !== '' && password !=='') {
      document.getElementById("loginBtn").disabled = false;
      document.getElementById("loginBtn").classList.add('btn');
    } else {
      document.getElementById("loginBtn").disabled = true;
      document.getElementById("loginBtn").classList.remove('btn');
    }

  }, [email, password]);

  useEffect(() => {
    if(userErr.code) {
      setTimeout(() => {
        setHideAlert(true);
      }, 30);
    }
    setHideAlert(false);
    return () => (userErr.code = '');
  }, [userErr]);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setHideAlert(false);
  }

  const configAuthWrapper = {
    headline: '마이 Blogs 로그인'
  };

  const configAlert = {
    text: userErr.code === 'auth/wrong-password' || userErr.code === 'auth/user-not-found' ? '패스워드 또는 이메일 주소가 틀렸습니다.':'너무 많은 요청을 보내셨습니다. 잠시 후에 다시 시도해주세요.',
    color: 'danger',
    hideAlert: hideAlert
  }

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(emailSignInStart({ email, password }));

  }

  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart());
  }

  return (
    <AuthWrapper {...configAuthWrapper}>
      
      {hideAlert && <Alert {...configAlert} key="signIn"/>}
      
      <div className="sign-in">
        <div className="sign-in-content-wrap">

          <form onSubmit={handleSubmit}>

            <FormInput 
              type="email"
              name="email"
              value={email}
              autoComplete="username"
              placeholder= "이메일 입력"
              handleChange={e => setEmail(e.target.value)}
            />

            <FormInput 
              type="password"
              name="password"
              value={password}
              placeholder= "비밀번호 입력"
              autoComplete="new-password"
              handleChange={e => setPassword(e.target.value)}
            />

            <Button id="loginBtn" className="login-btn" type="submit" disabled>
              이메일 로그인
            </Button>

            <div className="sign-in-social">
              <Button className="btn" onClick={handleGoogleSignIn}>
                <FontAwesomeIcon className="i" icon={faGoogle} />
                <p>Google계정으로 이용하기</p>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AuthWrapper>
  );
}

export default SignIn;
