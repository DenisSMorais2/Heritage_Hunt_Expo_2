import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC3kMpLDXwv40bxEZuZhOz4tj0_2HO-W3w",
  authDomain: "heritagehunte.firebaseapp.com",
  projectId: "heritagehunte",
  storageBucket: "heritagehunte.firebasestorage.app",
  messagingSenderId: "685069061756",
  appId: "1:685069061756:web:3a3c9247036c0b0a7283f9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };

