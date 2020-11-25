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

export const handleFetchContents = () => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('contents')
      .get()
      .then(snapshot => {
        const contentsArray = snapshot.docs.map(doc => {
          return {
            ...doc.data(),
            documentID: doc.id
          }
        });
        resolve(contentsArray);  
      })
      .catch(err => {
        reject(err)
      })
  });
}