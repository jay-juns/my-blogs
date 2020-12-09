import alertTypes from './alert.types';

const INITIAL_STATE = {
  text: '',
  color: ''
}

const alertReducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case alertTypes.SET_ALERT:
      return {
        ...state,
        contents: action.msg
      }
    case alertTypes.RESET_ALERT:
        return {
          INITIAL_STATE
        }  
    default:
      return state;
  }
};

export default alertReducer;