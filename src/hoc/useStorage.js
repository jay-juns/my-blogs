import { useState, useEffect } from 'react';
import { useSelector } from  'react-redux';
import { storage, firestore } from './../firebase/utils';

const mapState = ({ user }) => ({
  currentUser: user.currentUser
});

const useStorage = (file) => {
  const { currentUser } = useSelector(mapState);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  let userId = [];
  for (let name in currentUser) { 
    if (name.includes('id')) {
      userId.push(currentUser.id); 
    }
  }

  useEffect(() => {
    
    const storageRef = storage.ref(`/users/${userId}/${file.name}`);
    const collectionRef = firestore.collection('users');
    const collectionRefInquires = firestore.collection('inquires');
    const collectionRefInquiresComment = firestore.collection('inquireComments');

    storageRef.put(file).on('state_changed', (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      setProgress(percentage);
    }, (err) => {
      setError(err);
    }, async () => {
      const url = await storageRef.getDownloadURL();
      await collectionRef.doc(userId[0]).update({ userImgUrl: url });
      await collectionRefInquires.where('authorUserId', '==', userId[0]).get().then(function(querySanpshot) {
        querySanpshot.forEach(function(doc) {
          doc.ref.update({
            userImgUrl: url
          })
        })
      });
      await collectionRefInquiresComment.where('authorUserId', '==', userId[0]).get().then(function(querySanpshot) {
        querySanpshot.forEach(function(doc) {
          doc.ref.update({
            authorImgUrl: url
          })
        })
      });
      setUrl(url);
    });
  }, [file]);

  return { progress, url, error };
}

export default useStorage;