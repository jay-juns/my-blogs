import { takeLatest, call, all, put } from 'redux-saga/effects';
import { auth, handleUserProfile, getCurrentUser, GoogleProvider } from './../../firebase/utils';
import userTypes from './user.types';
import { signInSuccess, signOutUserSuccess, resetPasswordSuccess, userError } from './user.actions';
import { handleResetPasswordAPI } from './user.helpers';
import { setAlert } from './../Alert/alert.action';

export function* getSnapshotFromUserAuth(user, additionalData={}) {
  try {
    const userRef = yield call(handleUserProfile, { userAuth: user, additionalData });
    const snapshot = yield userRef.get();
    yield put(
      signInSuccess({
        id: snapshot.id,
        ...snapshot.data()
      })
    );
    
  } catch(err) {
    // console.log(err);
  }
}

export function* emailSignIn({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch(err) {
    // console.log(err);
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);

  } catch(err) {
    // console.log(err);
  }
}

export function* onCheckUserSession() {
  yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated);
}


export function* signOutUser() {
  try {
    yield auth.signOut();
    yield put(
      signOutUserSuccess()
    )

  } catch(err) {
    // console.log(err);
  }
}

export function* onSignOutUserStart() {
  yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser);
}


export function* signUpUser({ payload: {
  displayName,
  userId,
  email,
  password,
  confirmPassword
}}) {
  
  if(displayName === 'admin' || displayName === '관리자' || userId === 'admin') {
    yield put(
      setAlert({
        text: '사용할 수 없는 이름입니다.',
        color: 'danger'
      })); 
      
      return;
  }

  if (password !== confirmPassword) {

    yield put(
      setAlert({
        text: '비밀번호가 일치하지 않습니다.',
        color: 'danger'
      }));    
    
    return;
  }

  try {

    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    const additionalData = { displayName, userId };
    yield getSnapshotFromUserAuth(user, additionalData); 

  } catch(e) {
    
    yield put(
      setAlert({
        text: e,
        color: 'danger'
      }));
  }
}

export function* onSignUpUserStart() {
 yield takeLatest(userTypes.SIGN_UP_USER_START, signUpUser);
}


export function* resetPassword({ payload: { email } }) {
  try {
    yield call(handleResetPasswordAPI, email);
    yield put(
      resetPasswordSuccess()
    );

  } catch(err) {
    yield put(
      userError(err)
    )
  }
}

export function* onResetPasswordStart() {
  yield takeLatest(userTypes.RESET_PASSWORD_START, resetPassword);
}


export function* gooleSignIn() {
  try {
    const { user } = yield auth.signInWithPopup(GoogleProvider);
    yield getSnapshotFromUserAuth(user);

  } catch (err) {
    // console.log(err);
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, gooleSignIn);
}


export default function* userSagas() {
  yield all([
    call(onEmailSignInStart), 
    call(onCheckUserSession), 
    call(onSignOutUserStart),
    call(onSignUpUserStart),
    call(onResetPasswordStart),
    call(onGoogleSignInStart)
  ])
}