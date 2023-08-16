import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyAhmKVNPGr7AAovZ2py4KZHoh_gl6JVbIo",
    authDomain: "crwn-db-80074.firebaseapp.com",
    projectId: "crwn-db-80074",
    storageBucket: "crwn-db-80074.appspot.com",
    messagingSenderId: "413709860124",
    appId: "1:413709860124:web:2f2959571a7588851aced9",
    measurementId: "G-6N3E754GS5"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
       const { displayName, email} = userAuth;
       const createAt = new Date();

       try {
        await userRef.set({
          displayName,
          email,
          createAt,
          ...additionalData
        })
       }catch (error){
        console.log('error creating user', error.message);
       }
    }
    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;