import { combineReducers } from 'redux';

import userReducer from './User/user.reducer';
import contentsReducer from './Contents/contents.reducer';
import alertReducer from './Alert/alert.reducer';
import inquireReducer from './Inquires/inquires.reducers';

export const rootReducer = combineReducers({
  user: userReducer,
  contentsData: contentsReducer,
  inquiresData: inquireReducer,
  msg: alertReducer
});

export default rootReducer;