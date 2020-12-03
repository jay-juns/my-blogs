import alertTypes from './alert.types';

export const setAlert = msg => ({
  type: alertTypes.SET_ALERT,
  payload: msg
});

export const resetAlert = () => ({
  type: alertTypes.RESET_ALERT
});

