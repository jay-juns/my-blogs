import { v4 as uuidv4 } from "uuid";
import { takeLatest, all, call, put } from 'redux-saga/effects';
import { fetchInquireComments, setInquireComments, setInquireComment } from './InquireComments.actions';
import {  handleAddInquireComments, handleFetchInquireComments, handleDeleteInquireComments, handleFetchInquireComment } from './InquireComments.helpers';
import  InquireCommentsTypes from './InquireComments.types';

//add

export function* addInquireComments({ payload }) {
  try {
    const timestamp = new Date();
    yield handleAddInquireComments({
      ...payload,
      uid: uuidv4(),
      createAt: timestamp      
    });
    yield put(
      fetchInquireComments()
    )
  } catch(err) {
    // console.log(err);
  }
}

export function* onAddInquireComments() {
  yield takeLatest(InquireCommentsTypes.ADD_INQUIRECOMMENTS, addInquireComments);
}


//fetches

export function* fetchInquireCommentsStart({ payload }) {
  try {
    const inquireComments = yield handleFetchInquireComments(payload);
    yield put(
      setInquireComments(inquireComments)
    );
  } catch(err) {
    // console.log(err);
  }
}

export function* onFetchInquireCommentsStart() {
  yield takeLatest(InquireCommentsTypes.FETCH_INQUIRECOMMENTS, fetchInquireCommentsStart);
}

//delete

export function* deleteInquireComments({ payload }) {
  try {
    yield handleDeleteInquireComments(payload);
    yield put (
      fetchInquireComments()
    );

  } catch(err) {
    // console.log(err);
  }
}

export function* onDeleteInquireCommentsStart() {
  yield takeLatest(InquireCommentsTypes.DELETE_INQUIRESCOMMENTS, deleteInquireComments);
}


//fetch

export function* fetchInquireCommentStart({ payload }) {
  try {
    const inquireComment = yield handleFetchInquireComment(payload);
    yield put(
      setInquireComment(inquireComment)
    );
  } catch(err) {
    console.log(err);
  }
}


export function* onFetchInquireCommentStart() {
  yield takeLatest(InquireCommentsTypes.FETCH_INQUIRECOMMENT, fetchInquireCommentStart);
}

export default function* inquireCommentsSagas() {
  yield all([
    call(onAddInquireComments),
    call(onFetchInquireCommentsStart),
    call(onDeleteInquireCommentsStart),
    call(onFetchInquireCommentStart)
  ])
}