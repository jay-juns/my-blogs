import inquiresTypes from './inquires.types';

const INITIAL_STATE = {
  inquires: []
}

const inquiresReducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case inquiresTypes.SET_INQUIRES:
      return {
        ...state,
        inquires: action.payload
      }
    default:
      return state;
  }
};

export default inquiresReducer;