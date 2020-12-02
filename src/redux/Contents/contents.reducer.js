import contentsTypes from './contents.types';

const INITIAL_STATE = {
  contents: []
}

const contentsReducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case contentsTypes.SET_CONTENTS:
      return {
        ...state,
        contents: action.payload
      }
    default:
      return state;
  }
};

export default contentsReducer;