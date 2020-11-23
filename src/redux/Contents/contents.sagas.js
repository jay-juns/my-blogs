import { auth } from './../../firebase/utils';
import { takeLatest, all, call } from 'redux-saga/effects';
// import { } from './contents.actions';
import { handleAddContentsData } from './contents.helpers';
import  contentsType from './contents.types';

export function* addContents({ payload }) {

  try {
    const timestamp = new Date();
    yield handleAddContentsData({
      ...payload,
      contentsAdminUserUID: auth.currentUser.uid,
      createDate: timestamp
    });

  } catch(err) {
    // console.log(err);
  }
}

export function* onAddContentsData() {
  yield takeLatest(contentsType.ADD_CONTENTS, addContents);
}

export default function* contentsSagas() {
  yield all([
    call(onAddContentsData)
  ])
}