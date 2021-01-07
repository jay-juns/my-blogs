import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signUpUserStart } from './../../redux/User/user.actions';
// import { setAlert } from './../../redux/Alert/alert.action';
import './styles.scss';

import FormInput from '../Forms/FormInput';
import Button from '../Forms/Button';
import AuthWrapper from '../AuthWrapper';

const mapState = ({ user }) => ({
  currentUser: user.currentUser
});

const Signup = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useSelector(mapState);
  const [displayName, setDisplayName] = useState('');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  useEffect(() => {
    if (currentUser) {
      reset();
      history.push('/');
    }

  }, [currentUser]);

  useEffect(() => {
    if(userId !== '' || displayName !== '' || email !== '' || password !=='' || confirmPassword !=='') {
      document.getElementById("signUpBtn").disabled = false;
      document.getElementById("signUpBtn").classList.add('btn');
    } else {
      document.getElementById("signUpBtn").disabled = true;
      document.getElementById("signUpBtn").classList.remove('btn');
    }

  }, [userId, displayName, email, password, confirmPassword]);

  const reset = () => {
    setDisplayName('');
    setUserId('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }

  const handleFormSubmit = event => {
    event.preventDefault();

    dispatch(signUpUserStart({
      displayName,
      userId,
      email,
      password,
      confirmPassword
    }));
  }

  const configAuthWrapper = {
    headline: '마이 Blogs Sign-In'
  };


  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="sign-up"> 

        <form onSubmit={handleFormSubmit}>
          <FormInput
            type="text"
            name="userId"
            value={userId}
            placeholder="사용자 이름 입력"
            handleChange={e => setUserId(e.target.value)}
          />

          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            placeholder="별명 입력"
            handleChange={e => setDisplayName(e.target.value)}
          />

          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="가입할 이메일 주소 입력"
            autoComplete="username"
            handleChange={e => setEmail(e.target.value)}
          />

          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="비밀번호 입력"
            autoComplete="new-password"
            handleChange={e => setPassword(e.target.value)}
          />

          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            autoComplete="confirm-password"
            placeholder="비밀번호 확인"
            handleChange={e => setConfirmPassword(e.target.value)}
          />

          <Button id="signUpBtn" type="submit" disabled>
            회원가입
          </Button>
        </form>
      </div>
    </AuthWrapper>
  )
}

export default Signup;
