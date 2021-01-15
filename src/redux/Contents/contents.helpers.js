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

export const handleFetchContents = ({ filterType, startAtferDoc, psersistContents=[] }) => {
  return new Promise((resolve, reject) => {
    const pageSize = 4;

    let ref = firestore.collection('contents').orderBy('createdDate', 'desc').limit(pageSize);

    if (filterType) ref = ref.where('contentTag', '==', filterType);
    if (startAtferDoc) ref = ref.startAfter(startAtferDoc);
      
    ref
      .get()  
      .then(snapshot => {
        const totalCount = snapshot.size;
        const data = [
          ...psersistContents,
          ...snapshot.docs.map(doc => {
          return {
            ...doc.data(),
            documentID: doc.id
          }
        })
      ];

        resolve({
          data,
          queryDoc: snapshot.docs[totalCount - 1],
          isLastPage: totalCount < 1
        });
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