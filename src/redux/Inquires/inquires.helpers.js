import { firestore } from '../../firebase/utils';

//add

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

//fetches

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
            documentID: doc.id
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

//main fetches

export const handleFetchMainInquires = ({ inquireType }) => {
  return new Promise((resolve, reject) => {

    const limitPage = 4;

    let ref = firestore.collection('inquires').orderBy('createdDate', 'desc').limit(limitPage);
    
    if (inquireType) ref = ref.where('inquireTag', '==', inquireType);
      
    ref
      .get()  
      .then(snapshot => {
        const data = [
          ...snapshot.docs.map(doc => {
          return {
            ...doc.data(),
            documentID: doc.id
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

//delete

export const handleDeleteInquire = documentID => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('inquires')
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

//update

export const handleEditInquire = (inquire) => {
  return new Promise((resolve, reject) => {    
     firestore
      .collection('inquires')
      .doc(inquire.id) 
      .update(inquire)  
      .then(() =>{
        resolve();
      })
      .catch(err => {
        reject(err)
      })
  });
}

//fetch

export const handleFetchInquire = (inquireID) => {
  return new Promise((resolve, reject) => {    
     firestore
      .collection('inquires')
      .doc(inquireID) 
      .get()  
      .then(snapshot => {
        
        if (snapshot.exists) {
          resolve({
            ...snapshot.data(),
            documentID: inquireID
          });
        }
      })
      .catch(err => {
        reject(err)
      })
  });
}

//like
export const handleLikeInquire = (inquireID) => {
  return new Promise((resolve, reject) => {    
     firestore
      .collection('inquires')
      .doc(inquireID.documentID) 
      .update(inquireID)  
      .then(() => {
        resolve()
      })
      .catch(err => {
        reject(err)
      })
  });
}

//vew count
export const handleUpdateViewInquire = (view) => {
  return new Promise((resolve, reject)=> {
    firestore
      .collection('inquires')
      .doc()
      .update(view)
      .then(() => {
        resolve
      })
      .catch(err => {
        reject(err)
      })
  });
}