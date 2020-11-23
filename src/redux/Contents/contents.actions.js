import contentsType from './contents.types';

export const addContentsData = contentData => ({
  type: contentsType.ADD_CONTENTS,
  payload: contentData
});