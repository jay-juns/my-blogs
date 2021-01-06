import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { emailSignInStart, googleSignInStart, signInSuccess } from './../../redux/User/user.actions';

import './styles.scss';

import FormInput from '../Forms/FormInput';
import Button from '../Forms/Button';
import AuthWrapper from '../AuthWrapper';
import Alert from '../Alert';

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

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setHideAlert(false);
  }

  const handleSubmit = e => {
    e.preventDefault();
    
    dispatch(emailSignInStart({ email, password }));
    const emailTarget = document.getElementById('email').value;
    const passwordTarget = document.getElementById('password').value;

    if(emailTarget === '' || passwordTarget === '') {
      const alertTimes = setTimeout(() => {
        setHideAlert(true);
      }, 30);
    }
    setHideAlert(false);
    console.log(hideAlert, '21312');
  }

  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart());
  }

  const configAuthWrapper = {
    headline: '로그인'
  };

  const configAlert = {
    text: '패스워드 또는 이메일 주소가 틀렸습니다. 다시 시도해주세요',
    color: 'danger',
    hideAlert: hideAlert
  }  

  return (
    <AuthWrapper {...configAuthWrapper}>
      
      {hideAlert && <Alert {...configAlert} />}
      
      <div className="sign-in">
        <div className="sign-in-content-wrap">

          <form onSubmit={handleSubmit}>

            <FormInput 
              type="email"
              name="email"
              id="email"
              value={email}
              autoComplete="username"
              placeholder= "이메일 입력"
              handleChange={e => setEmail(e.target.value)}
            />

            <FormInput 
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder= "비밀번호 입력"
              autoComplete="new-password"
              aria-describedby="password-constraints" 
              required=""
              handleChange={e => setPassword(e.target.value)}
            />

            <Button className="login-btn btn" type="submit">
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
