import { firestore } from '../../firebase/utils';

export const handleAddInquire = inquire => {
  return new Promise((resolve, reject) => {

    firestore
      .collection('inquires')
      .doc()
      .set(inquire)
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      })
  });
}

export const handleFetchInquires = ({ inquireType }) => {
  return new Promise((resolve, reject) => {
    
    let ref = firestore.collection('inquires').orderBy('createdDate', 'desc');
    
    if (inquireType) ref = ref.where('inquireTag', '==', inquireType);
      
    ref
      .get()  
      .then(snapshot => {
        const data = [

          ...snapshot.docs.map(doc => {
          return {
            ...doc.data(),
            textID: doc.id
          }
        })
      ];

        resolve({ data });
      })
      .catch(err => {
        reject(err)
      })
  });
}


export const handleDeleteInquire = textID => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('inquires')
      .doc(textID)
      .delete()
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      })
  });
}