import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { signUpUserStart } from './../../redux/User/user.actions';

import './styles.scss';

import FormInput from '../Forms/FormInput';
import Button from '../Forms/Button';
import AuthWrapper from '../AuthWrapper';
import Alert from '../Alert';

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userErr: user.userErr
});

const Signup = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser, userErr } = useSelector(mapState);
  const [displayName, setDisplayName] = useState('');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hideAlert, setHideAlert] = useState(false);

  useEffect(() => {
    if (currentUser) {
      reset();
      history.push('/');
    }

  }, [history, currentUser]);

  useEffect(() => {
    if(userId !== '' && displayName !== '' && email !== '' && password !=='' && confirmPassword !=='') {
      document.getElementById("signUpBtn").disabled = false;
      document.getElementById("signUpBtn").classList.add('btn');
    } else {
      document.getElementById("signUpBtn").disabled = true;
      document.getElementById("signUpBtn").classList.remove('btn');
    }

  }, [userId, displayName, email, password, confirmPassword]);

  useEffect(() => {
    if(userErr.code) {
      setTimeout(() => {
        setHideAlert(true);
      }, 30);
    }
    setHideAlert(false);
    return () => (userErr.code = '');
  }, [userErr]);

  const reset = () => {
    setDisplayName('');
    setUserId('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setHideAlert(false);
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

  const configAlert = {
    text: `${userErr.message}`,
    color: 'danger',
    hideAlert: hideAlert
  }

  const configAuthWrapper = {
    headline: '마이 Blogs 회원가입'
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <Helmet>
        <title>Signup - MyBlogs</title>
      </Helmet>
      <div className="sign-up"> 

      {hideAlert && <Alert {...configAlert} key="signUp"/>}

        <form onSubmit={handleFormSubmit}>
          <FormInput
            type="text"
            name="userId"
            value={userId}
            placeholder="유저 아이디 입력"
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
