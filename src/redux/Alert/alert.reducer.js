import alertTypes from './alert.types';

const INITIAL_STATE = {
  alertMessages:{
    text: '',
    color: ''
  }
}

const alertReducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case alertTypes.SET_ALERT:
      return {
        ...state,
        alertMessages: action.payload
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