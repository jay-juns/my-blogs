import { auth } from './../../firebase/utils';
import { takeLatest, all, call, put } from 'redux-saga/effects';
import { 
  fetchInquiresStart, 
  fetchInquireStart, 
  setInquires, 
  setInquire,
  setLoadinginquire,
   
} from './inquires.actions';
import { 
  handleFetchInquires, 
  handleFetchMainInquires, 
  handleAddInquire, 
  handleDeleteInquire, 
  handleFetchInquire, 
  handleLikeInquire,
  handleEditInquire,
  handleUpdateViewInquire 
} from './inquires.helpers';
import  inquiresTypes from './inquires.types';

//add

export function* addInquire({ payload }) {

  try {
    const timestamp = new Date();
    yield handleAddInquire({
      ...payload,
      inquireAdminUserUID: auth.currentUser.uid,
      likeInfo: [{
        likeCount: 0,
        userInfo:[]
      }],
      inquireView: 0,
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
  yield takeLatest(inquiresTypes.ADD_INQUIRES_START, addInquire);
}


//fetches

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

//main fetches

export function* fetchMainInquires({ payload }) {
  try {
    const inquires = yield handleFetchMainInquires(payload);
    yield put(
      setInquires(inquires)
    );
    yield put(
      setLoadinginquire(true)
    );
  } catch (err) {
    // console.log(err);
  }
}

export function* onFetchInquiresMainStart() {
  yield takeLatest(inquiresTypes.FETCH_INQUIRES_MAIN_START, fetchMainInquires);
}

//delete

export function* deleteInquire({ payload }) {
  try {
    yield handleDeleteInquire(payload);
    yield put (
      fetchInquireStart()
    );

  } catch(err) {
    // console.log(err);
  }
}

export function* onDeleteInquireStart() {
  yield takeLatest(inquiresTypes.DELETE_INQUIRE_START, deleteInquire);
}

//sets

export function* fetchInquire({ payload }) {
  try {
    const inquire = yield handleFetchInquire(payload);
    yield put(
      setInquire(inquire)
    );
  } catch(err) {
    // console.log(err);
  }
}

export function* onFetchInquireStart() {
  yield takeLatest(inquiresTypes.FETCH_INQUIRE_START, fetchInquire);
}

//update

export function* editInquire({ payload }) {
  try {
    yield handleEditInquire(payload);
    yield put(
      fetchInquireStart(payload.id)
    );
  } catch(err) {
    // console.log(err);
  }
}

export function* onEditInquireStart() {
  yield takeLatest(inquiresTypes.EDIT_INQUIRE, editInquire);
}

//like

export function* likeInquire({ payload }) {
  try {
    yield handleLikeInquire(payload);
    yield put(
      fetchInquireStart(payload.documentID)
    );
  } catch(err) {
    // console.log(err);
  }
}

export function* onLikeInquireStart() {
  yield takeLatest(inquiresTypes.INQUIRE_LIKE, likeInquire);
}

//updateView
export function* updateViewStart({ payload }) {
  try {
    yield handleUpdateViewInquire(payload)
    yield put(
      fetchInquireStart(payload)
    )
  } catch(err) {
    console.log(payload)
    console.log(err)
  }
}

export function* onUpdateViewInquireStart() {
  yield takeLatest(inquiresTypes.INQUIRE_VIEW, updateViewStart)
}

export default function* inquiresSagas() {
  yield all([
    call(onAddInquiresStart),
    call(onFetchInquiresStart),
    call(onFetchInquiresMainStart),
    call(onDeleteInquireStart),
    call(onFetchInquireStart),
    call(onEditInquireStart),
    call(onLikeInquireStart),
    call(onUpdateViewInquireStart)
  ])
}