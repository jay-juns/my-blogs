import InquireCommentsTypes from './InquireComments.types';

export const addInquireComments = inquireCommentsData => ({
  type: InquireCommentsTypes.ADD_INQUIRECOMMENTS,
  payload: inquireCommentsData
});

export const fetchInquireComments = (filters={}) => ({
  type: InquireCommentsTypes.FETCH_INQUIRECOMMENTS,
  payload: filters
});

export const setInquireComments = inquireComments => ({
  type: InquireCommentsTypes.SET_INQUIRECOMMENTS,
  payload: inquireComments
});