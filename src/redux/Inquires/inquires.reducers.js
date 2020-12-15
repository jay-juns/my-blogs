import inquiresTypes from './inquires.types';

const INITIAL_STATE = {
  inquires: [],
  inquire:{}
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
    default:
      return state;
  }
};

export default inquiresReducer;