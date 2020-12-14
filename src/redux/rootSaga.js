import { all, call } from 'redux-saga/effects';

import userSagas from './User/user.sagas';
import contentsSagas from './Contents/contents.sagas';
import inquiresSagas from './Inquires/inquires.sagas';

export default function* rootSaga() {
  yield all([
    call(userSagas),
    call(contentsSagas),
    call(inquiresSagas)
  ])
}