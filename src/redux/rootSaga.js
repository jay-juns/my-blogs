import { all, call } from 'redux-saga/effects';

import userSagas from './User/user.sagas';
import contentsSagas from './Contents/contents.sagas';
import inquiresSagas from './Inquires/inquires.sagas';
import inquireCommentsSagas from './Comments/InquireComments/InquireComments.sagas';

export default function* rootSaga() {
  yield all([
    call(userSagas),
    call(contentsSagas),
    call(inquiresSagas),
    call(inquireCommentsSagas)
  ])
}