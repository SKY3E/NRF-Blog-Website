import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCSekiuLxsUFO5GAvnk2i4JBW_WrliVUEM",
    authDomain: "nextfire-website.firebaseapp.com",
    projectId: "nextfire-website",
    storageBucket: "nextfire-website.appspot.com",
    messagingSenderId: "591235871738",
    appId: "1:591235871738:web:c15cb81f288d35760caa43",
    measurementId: "G-6STRBLFY0C"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

export const firestore = getFirestore(app);
export const storage = getStorage(app);