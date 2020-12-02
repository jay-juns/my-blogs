import { firestore } from './../../firebase/utils';

export const handleAddContent = content => {
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
      .orderBy('createDate')
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


export const handleDeleteContent = documentID => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('contents')
      .doc(documentID)
      .delete()
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      })
  });
}


export const handleFetchContent = contentID => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('contents')
      .doc(contentID)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          resolve(
            snapshot.data()
          );
        }
      })
      .catch(err => {
        reject(err);
      })
  });
}