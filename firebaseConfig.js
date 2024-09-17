import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDbeRWlix5wf9yw9hb53DvbP3pQDpXo0Fs",
  authDomain: "lab02-bb237.firebaseapp.com",
  projectId: "lab02-bb237",
  storageBucket: "lab02-bb237.appspot.com",
  messagingSenderId: "692790210995",
  appId: "1:692790210995:web:3c7dc3b669ba923646dbc6",
  measurementId: "G-CH1FF6V006"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
