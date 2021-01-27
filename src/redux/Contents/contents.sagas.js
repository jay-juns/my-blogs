import { takeLatest, all, call, put } from 'redux-saga/effects';
import { setContents, setContent, fetchContentsStart, setLoadingContent } from './contents.actions';
import { handleAddContent, handleFetchContents, handleDeleteContent, handleFetchContent } from './contents.helpers';
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
    yield put(
      setLoadingContent(true)
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


export function* fetchContent({ payload }) {

  try {
     const content = yield handleFetchContent(payload);
     yield put(
      setContent(content)
     );
     yield put(
      setLoadingContent(true)
    );  
  } catch(err) {
    // console.log(err);
  }
}

export function* onFetchContentStart() {
  yield takeLatest(contentsTypes.FETCH_CONTENT_START, fetchContent);
}


export default function* contentsSagas() {
  yield all([
    call(onAddContentStart),
    call(onFetchContentsStart),
    call(onDeleteContentStart),
    call(onFetchContentStart)
  ])
}