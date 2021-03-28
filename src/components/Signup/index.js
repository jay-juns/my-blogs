import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { signUpUserStart } from './../../redux/User/user.actions';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import './styles.scss';

import FormValidateInput from '../Forms/FormValidateInput';
import Button from '../Forms/Button';
import AuthWrapper from '../AuthWrapper';
import Alert from '../Alert';
import { values } from 'lodash';

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userErr: user.userErr
});

const Signup = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser, userErr } = useSelector(mapState);
  const [hideAlert, setHideAlert] = useState(false);
  let nameRegex = /^[A-Za-z]+$/;

  const validate = Yup.object({
    email:Yup.string()
    .email('이메일 형식이 아닙니다.')
    .required('이메일을 입력하세요.'),
    userId:Yup.string()
    .min(2, '아이디는 최소 2자 이상입니다.')
    .max(10, '아이디는 최대 글자수는 10글자 이하입니다.')
    .matches(nameRegex, "아이디는 영어만 가능합니다.")
    .required('아이디를 입력하세요.'),
    displayName:Yup.string()
    .min(2, '별명은 최소 2자 이상입니다.')
    .required('별명를 입력하세요'),
    password: Yup.string()
    .min(5, '비밀번호는 최소 5자 이상입니다.')
    .matches(
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, 
      '최소 1개 이상 특수문자를 넣어주세요.'
    )
    .required('비밀번호를 입력하세요.'),
    confirmPassword: Yup.string().when("password", {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "패스워드와 같지 않습니다."  
      )
    })
  })

  useEffect(() => {
    if (currentUser) {
      reset();
      history.push('/');
    }

  }, [history, currentUser]);

  const reset = () => {
    setHideAlert(false);
  };

  const handleFormSubmit = (data) => {
    // event.preventDefault();
    console.log(userErr, 'error');
    console.log(data);
    if(userErr.code) {
      setTimeout(() => {
        setHideAlert(true);
      }, 30);
      setHideAlert(false);
      return userErr.code = '';
    }

    dispatch(signUpUserStart({
      displayName: data.displayName,
      userId: data.userId,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword
    }));
  };

  const configAlert = {
    text: userErr.code === 'auth/email-already-in-use' ? '이미 등록된 계정입니다.' : '에러가 발생했습니다.',
    color: 'danger',
    position: 'topCenter',
    hideAlert: hideAlert
  }

  const configAuthWrapper = {
    headline: '마이 Blogs 회원가입'
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <Helmet>
        <title> 회원가입 - My Blogs</title>
      </Helmet>

      {hideAlert && <Alert {...configAlert}  key="signUp"/>}

      <Formik
        initialValues={{
          email: '',
          userId: '',
          displayName: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={validate}
        onSubmit={values =>{
          handleFormSubmit(values)
        }}
      >
        <div className="sign-up"> 
          <Form>
            <FormValidateInput
              label="이메일"
              type="email"
              name="email"
              value={values.email}
              placeholder="가입할 이메일 주소 입력"
            />

            <FormValidateInput
              label="유저아이디"
              type="text"
              name="userId"
              value={values.userId}
              placeholder="유저 아이디 입력"
            />

            <FormValidateInput
              label="별명"
              type="text"
              name="displayName"
              value={values.displayName}
              placeholder="별명 입력"
            />

            <FormValidateInput
              label="비밀번호"
              type="password"
              name="password"
              value={values.password}
              placeholder="비밀번호 입력"
            />

            <FormValidateInput
              label="비밀번호 확인"
              type="password"
              name="confirmPassword"
              value={values.confirmPassword}
              placeholder="비밀번호 확인"
            />

            <Button className="btn" type="submit">
              회원가입
            </Button>
          </Form>
        </div>
      </Formik>
      
    </AuthWrapper>
  )
}

export default Signup;
