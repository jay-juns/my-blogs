import contentsTypes from './contents.types';

export const addContentStart = contentData => ({
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

export const setContent = content => ({
  type: contentsTypes.SET_CONTENT,
  payload: content
});

export const setLoadingContent = isPending => ({
  type: contentsTypes.IS_PENDING,
  payload: isPending
});