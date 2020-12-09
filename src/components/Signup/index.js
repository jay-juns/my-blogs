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
  const [userID, setUserID] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (currentUser) {
      reset();
      history.push('/');
    }

  }, [currentUser]);


  const reset = () => {
    setDisplayName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setUserID('');
  }

  const handleFormSubmit = event => {
    event.preventDefault();

    dispatch(signUpUserStart({
      displayName,
      userID,
      email,
      password,
      confirmPassword
    }));
  }

  const configAuthWrapper = {
    headline: '회원가입'
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="sign-up"> 

        <form onSubmit={handleFormSubmit}>
          <FormInput
            type="text"
            name="userID"
            value={userID}
            placeholder="사용자 이름 입력"
            handleChange={e => setUserID(e.target.value)}
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
            handleChange={e => setEmail(e.target.value)}
          />

          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="비밀번호 입력"
            handleChange={e => setPassword(e.target.value)}
          />

          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="비밀번호 확인"
            handleChange={e => setConfirmPassword(e.target.value)}
          />

          <Button type="submit">
            회원가입
          </Button>
        </form>
      </div>
    </AuthWrapper>
  )
}

export default Signup;
