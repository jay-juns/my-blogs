import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { emailSignInStart, googleSignInStart } from './../../redux/User/user.actions';
import FormValidateInput from './../Forms/FormValidateInput';
import './styles.scss';

import Button from '../Forms/Button';
import AuthWrapper from '../AuthWrapper';
import Alert from '../Alert';

import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { values } from 'lodash';

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userErr: user.userErr
});

const SignIn = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser, userErr } = useSelector(mapState);
  const [hideAlert, setHideAlert] = useState(false);

  const validate = Yup.object({
    email:Yup.string()
    .email('이메일 형식이 아닙니다.')
    .required('이메일을 입력하세요'),
    password: Yup.string()
    .min(5, '비밀번호는 최소 5자 이상입니다.')
    .required('비밀번호를 입력하세요.')
  })
  
  useEffect(() => {
    if (currentUser) {
      resetForm();
      if(history.length > 0) {
        history.goBack();
      } else {
        history.push('/');
      }
    }    
  }, [history, currentUser]);

  const resetForm = () => {
    setHideAlert(false);
  }

  const configAuthWrapper = {
    headline: '마이 Blogs 로그인'
  };

  const handleSubmit = (data) => {
    // e.preventDefault();
    if(userErr.code) {
      setTimeout(() => {
        setHideAlert(true);
      }, 30);
      setHideAlert(false);
      return userErr.code = '';
    }
    dispatch(emailSignInStart({ email: data.email, password: data.password }));
  }

  const configAlert = {
    text: userErr.code === 'auth/wrong-password' || userErr.code === 'auth/user-not-found' ? '패스워드 또는 이메일 주소가 틀렸습니다.':'너무 많은 요청을 보내셨습니다. 잠시 후에 다시 시도해주세요.',
    color: 'danger',
    position: 'topCenter',
    hideAlert: hideAlert
  };

  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart());
  }

  return (
    <AuthWrapper {...configAuthWrapper}>
      <Helmet>
        <title>로그인 - My Blogs</title>
      </Helmet>
      {hideAlert && <Alert {...configAlert} key="signIn"/>}
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={validate}
        onSubmit={values =>{
          handleSubmit(values)
        }}
      >
        <div className="sign-in">
          <div className="sign-in-content-wrap">
            <Form>
              <FormValidateInput 
                label="이메일"
                type="email"
                name="email"
                value={values.email}
                placeholder= "이메일 입력"
              />

              <FormValidateInput
                label="비밀번호" 
                type="password"
                name="password"
                value={values.password}
                placeholder= "비밀번호 입력"
              />

              <Button 
                className="btn login-btn" 
                type="submit">
                이메일 로그인
              </Button>
            </Form>
            <div className="sign-in-social">
              <Button 
                className="btn" 
                onClick={handleGoogleSignIn}>
                <FontAwesomeIcon className="i" icon={faGoogle} />
                <p>Google계정으로 이용하기</p>
              </Button>
            </div>
            
          </div>
        </div>
      
      </Formik>
    </AuthWrapper>
  );
}

export default SignIn;
