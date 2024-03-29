import { firestore } from '../../../firebase/utils';

//add

export const handleAddInquireComments = inquireComment => {
  return new Promise((resolve, reject) => {    

     firestore
      .collection('inquireComments')
      .doc() 
      .set({ 
        ...inquireComment,
        inquireID: inquireComment.id 
      })  
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err)
      })
  });
}

//fetches

export const handleFetchInquireComments = () => {
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

//delete

export const handleDeleteInquireComments = documentID => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('inquireComments')
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

//fetch

export const handleFetchInquireComment = ({ inquireID }) => {
  return new Promise((resolve, reject) => {
    
    let db = firestore.collection('inquireComments').where('id', '==', inquireID).orderBy('createAt', 'desc');

    db
      .get()
      .then(snapshot => {
        
        const messageRoomData = [
            ...snapshot.docs.map(doc => {
            return {
              ...doc.data(),
              documentID: doc.id
            }
          })
        ];

        resolve({ messageRoomData });
      })
      .catch(err => {
        reject(err);
      })
  })
}