import { v4 as uuidv4 } from "uuid";
import { takeLatest, all, call, put } from 'redux-saga/effects';
import { fetchInquireComments, setInquireComments } from './InquireComments.actions';
import {  handleAddInquireComments, handleFetchInquireComments } from './InquireComments.helpers';
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


//fetch

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

export default function* inquireCommentsSagas() {
  yield all([
    call(onAddInquireComments),
    call(onFetchInquireCommentsStart)
  ])
}