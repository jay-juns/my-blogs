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

export const deleteInquireComments = inquireCommentsID => ({
  type: InquireCommentsTypes.DELETE_INQUIRESCOMMENTS,
  payload: inquireCommentsID
});

export const fetchInquireComment = (inquireRoomComments={}) => ({
  type: InquireCommentsTypes.FETCH_INQUIRECOMMENT,
  payload: inquireRoomComments
});

export const setInquireComment = inquireComment => ({
  type: InquireCommentsTypes.SET_INQUIRECOMMENT,
  payload: inquireComment
});