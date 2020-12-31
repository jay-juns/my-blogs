import { firestore } from '../../../firebase/utils';

export const handleAddInquireComments = inquireComment => {
  return new Promise((resolve, reject) => {    

     firestore
      .collection('inquireComments')
      .doc() 
      .set(inquireComment)  
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err)
      })
  });
}

export const handleFetchInquireComments = ({}) => {
  return new Promise((resolve, reject) => {  
    
    let ref = firestore.collection('inquireComments').orderBy('createAt', 'desc');

    ref
      .get()  
      .then(snapshot => {
        
        const messageData = [

            ...snapshot.docs.map(doc => {
            return {
              ...doc.data(),
              documentID: doc.id
            }
          })
        ];

          resolve({ messageData });
      })
      .catch(err => {
        reject(err)
      })
  });
}