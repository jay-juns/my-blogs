import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

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

// const configStorage = {
//   key: 'root',
//   storage,
//   whitelist: ['cartData']
// };

export default rootReducer;