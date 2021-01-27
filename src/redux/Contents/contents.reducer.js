import contentsTypes from './contents.types';

const INITIAL_STATE = {
  contents: [],
  content: {},
  loading: false
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
      case contentsTypes.IS_PENDING:
        return {
          ...state,
          loading: action.payload
      }  
    default:
      return state;
  }
};

export default contentsReducer;