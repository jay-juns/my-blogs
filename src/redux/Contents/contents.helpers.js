import { firestore } from './../../firebase/utils';

export const handleAddContentsData = content => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('contents')
      .doc()
      .set(content)
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      })
  });
}