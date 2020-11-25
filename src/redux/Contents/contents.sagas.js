import { auth } from './../../firebase/utils';
import { takeLatest, all, call, put } from 'redux-saga/effects';
import { setContents } from './contents.actions';
import { handleAddContentsData, handleFetchContents } from './contents.helpers';
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


export function* fetchContents() {
  try {
    const contents = yield handleFetchContents();
    yield put(
      setContents(contents)
    )
  } catch (err) {
    // console.log(err);
  }
}

export function* onFetchContentsStart() {
  yield takeLatest(contentsType.FETCH_CONTENTS_START, fetchContents);
}

export default function* contentsSagas() {
  yield all([
    call(onAddContentsData),
    call(onFetchContentsStart)
  ])
}