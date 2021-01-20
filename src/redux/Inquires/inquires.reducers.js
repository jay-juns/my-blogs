import inquiresTypes from './inquires.types';
import { handleLike } from './inquires.utils';

const INITIAL_STATE = {
  inquires: [],
  inquire:{},
  likeInfo: []
}

const inquiresReducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case inquiresTypes.SET_INQUIRES:
      return {
        ...state,
        inquires: action.payload
      }
    case inquiresTypes.SET_INQUIRE:
      return {
        ...state,
        inquire: action.payload
      }
    case inquiresTypes.INQUIRE_LIKE:
      return {
        ...state,
        likeInfo: handleLike({
         count: state.likeInfo,
         box: action.payload
        })
      }    
    default:
      return state;
  }
};

export default inquiresReducer;