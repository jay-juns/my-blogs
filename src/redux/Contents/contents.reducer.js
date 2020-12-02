import contentsTypes from './contents.types';

const INITIAL_STATE = {
  contents: [],
  content: {}
}

const contentsReducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case contentsTypes.SET_CONTENTS:
      return {
        ...state,
        contents: action.payload
      }
    case contentsTypes.SET_CONTENT:
      return {
        ...state,
        content: action.payload
      }  
    default:
      return state;
  }
};

export default contentsReducer;