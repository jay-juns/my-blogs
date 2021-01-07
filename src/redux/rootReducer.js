import { combineReducers } from 'redux';

import userReducer from './User/user.reducer';
import contentsReducer from './Contents/contents.reducer';
import inquireReducer from './Inquires/inquires.reducers';
import inquireCommentsReducer from './Comments/InquireComments/InquireComments.reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  contentsData: contentsReducer,
  inquiresData: inquireReducer,
  messages: inquireCommentsReducer
});

export default rootReducer;