import * as firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqyXMGB_H_01Tuyf5M6gVMkOSykaGZISM",
  authDomain: "authentication-52607.firebaseapp.com",
  projectId: "authentication-52607",
  storageBucket: "authentication-52607.appspot.com",
  messagingSenderId: "509307420671",
  appId: "1:509307420671:web:8cbffe675e61a3242631ca",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };
