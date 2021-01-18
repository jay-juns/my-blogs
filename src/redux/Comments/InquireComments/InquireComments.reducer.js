import InquireCommentsTypes from './InquireComments.types';

const INITIAL_STATE = {
  inquireComments: {},
  inquireComment: {}
}

const inquireCommentsReducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case InquireCommentsTypes.SET_INQUIRECOMMENTS:
      return {
        ...state,
        inquireComments: action.payload
      }
    case InquireCommentsTypes.SET_INQUIRECOMMENT:
      return {
        ...state,
        inquireComment: action.payload
      }
    default:
      return state;
  }
};

export default inquireCommentsReducer;