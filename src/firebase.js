import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBNjkKn_H2WGNruerWg0NH5DUIGC_N3mdM",
    authDomain: "quora-ev-f1f29.firebaseapp.com",
    projectId: "quora-ev-f1f29",
    storageBucket: "quora-ev-f1f29.appspot.com",
    messagingSenderId: "472308161650",
    appId: "1:472308161650:web:851424afb7acb4bcb036eb",
    measurementId: "G-EWZYW3XSKX"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const auth=firebase.auth()
   const provider=new firebase.auth.GoogleAuthProvider()

  const db=firebaseApp.firestore()

  export {auth,provider}
  export default db