import inquiresTypes from './inquires.types';

export const addInquiresStart = inquireData => ({
  type: inquiresTypes.ADD_INQUIRES_START,
  payload: inquireData
});

export const fetchInquiresStart = (filters={}) => ({
  type: inquiresTypes.FETCH_INQUIRES_START,
  payload: filters
});

export const fetchInquiresMainStart = (filters={}) => ({
  type: inquiresTypes.FETCH_INQUIRES_MAIN_START,
  payload: filters
});

export const setInquires = inquires => ({
  type: inquiresTypes.SET_INQUIRES,
  payload: inquires
});

export const deleteInquireStart = inquireID => ({
  type: inquiresTypes.DELETE_INQUIRE_START,
  payload: inquireID
});

export const fetchInquireStart = inquireID => ({
  type: inquiresTypes.FETCH_INQUIRE_START,
  payload: inquireID
});

export const setInquire = inquire => ({
  type: inquiresTypes.SET_INQUIRE,
  payload: inquire
});

export const updateInquire = inquire => ({
  type: inquiresTypes.EDIT_INQUIRE,
  payload: inquire
});

export const inquireLike = (inquire) => ({
  type: inquiresTypes.INQUIRE_LIKE,
  payload: inquire
})