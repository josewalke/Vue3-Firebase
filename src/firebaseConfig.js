// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB-aMQ6Gq2GrOXFjRlfejiG0vQPNdBTXdo",
  authDomain: "prueba-7f5f2.firebaseapp.com",
  projectId: "prueba-7f5f2",
  storageBucket: "prueba-7f5f2.appspot.com",
  messagingSenderId: "5309476291",
  appId: "1:5309476291:web:fac0a53a1386851e3e6176"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
