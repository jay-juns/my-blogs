import { takeLatest, all, call, put } from 'redux-saga/effects';
import { setContents, fetchContentsStart } from './contents.actions';
import { handleAddContent, handleFetchContents, handleDeleteContent } from './contents.helpers';
import  contentsTypes from './contents.types';

export function* addContent({ payload }) {

  try {
    const timestamp = new Date();
    yield handleAddContent({
      ...payload,
      createdDate: timestamp
    });

    yield put(
      fetchContentsStart()
    );

  } catch(err) {
    // console.log(err);
  }
}

export function* onAddContentStart() {
  yield takeLatest(contentsTypes.ADD_CONTENT_START, addContent)
}


export function* fetchContents({ payload }) {
  try {
    const contents = yield handleFetchContents(payload);
    yield put(
      setContents(contents)
    );
  } catch (err) {
    // console.log(err);
  }
}

export function* onFetchContentsStart() {
  yield takeLatest(contentsTypes.FETCH_CONTENTS_START, fetchContents);
}



export function* deleteContent({ payload }) {
  try {
    yield handleDeleteContent(payload);
    yield put (
      fetchContentsStart()
    );

  } catch(err) {
    // console.log(err);
  }
}


export function* onDeleteContentStart() {
  yield takeLatest(contentsTypes.DELETE_CONTENT_START, deleteContent);
}


export default function* contentsSagas() {
  yield all([
    call(onAddContentStart),
    call(onFetchContentsStart),
    call(onDeleteContentStart)
  ])
}