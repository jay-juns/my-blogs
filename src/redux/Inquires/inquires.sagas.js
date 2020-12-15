import { takeLatest, all, call, put } from 'redux-saga/effects';
import { fetchInquiresStart, setInquires, setInquire  } from './inquires.actions';
import { handleFetchInquires, handleAddInquire, handleDeleteInquire, handleFetchInquire } from './inquires.helpers';
import  inquiresTypes from './inquires.types';

export function* addInquire({ payload }) {

  try {
    const timestamp = new Date();
    yield handleAddInquire({
      ...payload,
      createdDate: timestamp     
    });

    yield put(
      fetchInquiresStart()
    );

  } catch(err) {
    // console.log(err);
  }
}

export function* onAddInquiresStart() {
  yield takeLatest(inquiresTypes.ADD_INQUIRES_START, addInquire)
}


export function* fetchInquires({ payload }) {
  try {
    const inquires = yield handleFetchInquires(payload);
    yield put(
      setInquires(inquires)
    );
  } catch (err) {
    // console.log(err);
  }
}

export function* onFetchInquiresStart() {
  yield takeLatest(inquiresTypes.FETCH_INQUIRES_START, fetchInquires);
}



export function* deleteInquire({ payload }) {
  try {
    yield handleDeleteInquire(payload);
    yield put (
      fetchInquiresStart()
    );

  } catch(err) {
    // console.log(err);
  }
}

export function* onDeleteInquireStart() {
  yield takeLatest(inquiresTypes.DELETE_INQUIRE_START, deleteInquire);
}



export function* fetchInquire({ payload }) {
  try {
    const inquire = yield handleFetchInquire(payload);
    yield put(
      setInquire(inquire)
    );
  } catch (err) {
    // console.log(err);
  }
}

export function* onFetchInquireStart() {
  yield takeLatest(inquiresTypes.FETCH_INQUIRE_START, fetchInquire);
}

export default function* inquiresSagas() {
  yield all([
    call(onAddInquiresStart),
    call(onFetchInquiresStart),
    call(onDeleteInquireStart),
    call(onFetchInquireStart)
  ])
}