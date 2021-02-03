import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: 'select_account' });

export const handleUserProfile = async ({ userAuth, additionalData }) => {
  if (!userAuth) return;
  const { uid } = userAuth;

  const userRef = firestore.doc(`users/${uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, userId, email } = userAuth;
    const timestamp = new Date();
    const userRoles = ['user'];
    const userFriends = {
      addFriends: [],
      blockFriends: [],
      messages: {}
    }
    const userImgUrl = '';
    const rendomColor = () => {
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += Math.floor(Math.random() * 10);
      }
      return color;
    };
    const color = rendomColor();
    
    try {
      await userRef.set({
        displayName,
        userId,
        color,
        userImgUrl,
        userFriends,
        email,
        createdDate: timestamp,
        userRoles,
        ...additionalData
      });
    } catch(err) {
      // console.log(err); 
    }
  }
  return userRef;
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  })
}