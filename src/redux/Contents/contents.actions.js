import contentsTypes from './contents.types';

export const addContentsStart = contentData => ({
  type: contentsTypes.ADD_CONTENT_START,
  payload: contentData
});

export const fetchContentsStart = (filters={}) => ({
  type: contentsTypes.FETCH_CONTENTS_START,
  payload: filters
});

export const setContents = contents => ({
  type: contentsTypes.SET_CONTENTS,
  payload: contents
});

export const deleteContentStart = contentID => ({
  type: contentsTypes.DELETE_CONTENT_START,
  payload: contentID
});

export const fetchContentStart = contentID => ({
  type: contentsTypes.FETCH_CONTENT_START,
  payload: contentID
});