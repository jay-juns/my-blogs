import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

import userReducer from './User/user.reducer';
import contentsReducer from './Contents/contents.reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  contentsData: contentsReducer
});

// const configStorage = {
//   key: 'root',
//   storage,
//   whitelist: ['cartData']
// };

export default rootReducer;