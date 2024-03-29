import { takeLatest, call, all, put } from 'redux-saga/effects';
import { auth, handleUserProfile, getCurrentUser, GoogleProvider } from './../../firebase/utils';
import userTypes from './user.types';
import { signInSuccess, signOutUserSuccess, resetPasswordSuccess, userError } from './user.actions';
import { handleResetPasswordAPI } from './user.helpers';

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
    yield put(userError(err));
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

  if (displayName === '' || userId === '') {
    const err = {
      code: '아이디/닉네임 입력',
      message: '빈칸에 내용을 채워 주세요.'
    }
    
    yield put(userError(err));
    return;
  }

  if (password !== confirmPassword) {

    const err = {
      code:'비밀번호 불일치',
      message:'비밀번호가 일치하지 않습니다.'
    };

    yield put(userError(err));    
    return;
  }

  try {

    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    const additionalData = { displayName, userId };
    yield getSnapshotFromUserAuth(user, additionalData);
  
  } catch(err) {
    
    yield put(userError(err));
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