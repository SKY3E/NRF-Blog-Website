import firebase from 'firebase/app';
import "firebase/auth";
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCSekiuLxsUFO5GAvnk2i4JBW_WrliVUEM",
    authDomain: "nextfire-website.firebaseapp.com",
    projectId: "nextfire-website",
    storageBucket: "nextfire-website.appspot.com",
    messagingSenderId: "591235871738",
    appId: "1:591235871738:web:c15cb81f288d35760caa43",
    measurementId: "G-6STRBLFY0C"
  };

if (!firebase.getApps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();