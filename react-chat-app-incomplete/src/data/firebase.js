import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAtE8K8Trlz1byd618IOQ71Cb8SZiMctRQ',
  authDomain: 'chat-app-92c5d.firebaseapp.com',
  projectId: 'chat-app-92c5d',
  storageBucket: 'chat-app-92c5d.appspot.com',
  messagingSenderId: '71383703005',
  appId: '1:71383703005:web:f01e53bc94bf01f9e5ea34',
  measurementId: 'G-J0YZ88DGG3',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
