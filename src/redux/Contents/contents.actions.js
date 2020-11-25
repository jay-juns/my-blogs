import contentsType from './contents.types';
import contentsTypes from './contents.types';

export const addContentsData = contentData => ({
  type: contentsTypes.ADD_CONTENTS,
  payload: contentData
});

export const fetchContentsStart = () => ({
  type: contentsTypes.FETCH_CONTENTS_START
});

export const setContents = contents => ({
  type: contentsType.SET_CONTENTS,
  payload: contents
})