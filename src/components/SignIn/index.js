import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { emailSignInStart, googleSignInStart } from './../../redux/User/user.actions';

import './styles.scss';

import FormInput from '../Forms/FormInput';
import Button from '../Forms/Button';
import AuthWrapper from '../AuthWrapper';
import Alert from '../Alert/GlobelAlert';

import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const mapState = ({ user }) => ({
  currentUser: user.currentUser
});

const SignIn = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useSelector(mapState);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [text, setText] = useState('');
  const [color, setColor] = useState('');

  useEffect(() => {
    if (currentUser) {
      resetForm();
      history.push('/');
    }

  }, [currentUser]);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setText('');
    setColor('');
  }

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(emailSignInStart({ email, password }));
  }

  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart());
  }

  const configAuthWrapper = {
    headline: '로그인'
  };
  
  return (
    <AuthWrapper {...configAuthWrapper}>
      <Alert 
        color={color}
        text={text}
      />
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
              aria-describedby="password-constraints" 
              required=""
              handleChange={e => setPassword(e.target.value)}
            />

            <Button className="login-btn" type="submit">
              로그인
            </Button>

            <div className="sign-in-social">
              <Button onClick={handleGoogleSignIn}>
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
