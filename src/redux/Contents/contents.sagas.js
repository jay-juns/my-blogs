import { auth } from './../../firebase/utils';
import { takeLatest, all, call, put } from 'redux-saga/effects';
import { setContents, fetchContentsStart } from './contents.actions';
import { handleAddContent, handleFetchContents, handleFetchContent, handleDeleteContent } from './contents.helpers';
import  contentsTypes from './contents.types';

export function* addContent({ payload: {
    contentTag,
    contentTitle,
    contentThumbnail,
    contentDesc
} }) {

  try {
    const timestamp = new Date();
    yield handleAddContent({
      contentTag,
      contentTitle,
      contentThumbnail,
      contentDesc,
      contentsAdminUserUID: auth.currentUser.uid,
      createdDate: timestamp
    });

    yield put(
      fetchContentsStart()
    );

  } catch(err) {
    // console.log(err);
  }
}

export function* onAddContentsStart() {
  yield takeLatest(contentsTypes.ADD_CONTENT_START, addContent)
}


export function* fetchContents({ payload: {
  filterType
} }) {
  try {
    const contents = yield handleFetchContents(filterType);
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



export function* fetchContent({ payload }) {
  try {
    const content = yield handleFetchContent({ payload });
    yield put(
      setContent(content)
    )
  } catch (err) {
    // console.log(err);
  }
}


export function* onFetchContentStart() {
  yield takeLatest(contentsTypes.FETCH_CONTENT_START, fetchContent);
}

export default function* contentsSagas() {
  yield all([
    call(onAddContentsStart),
    call(onFetchContentsStart),
    call(onDeleteContentStart),
    call(onFetchContentStart)
  ])
}