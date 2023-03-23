import { initializeApp, firebase } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore, collection, query, limit, where, getDocs, Timestamp, FieldValue, getDoc, doc } from "firebase/firestore";
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

// Helper functions
export async function getUserWithUsername(username) {
  const queryRef = query(
    collection(firestore, 'users'),
    limit(1),
    where('username', "==", username)
  );
  const userDoc = (await getDocs(queryRef)).docs[0];
  return userDoc;
}

export async function getUsernameWithUser(user) {
  const userRef = doc(collection(firestore, 'users'), user);
  const userSnapshot = await getDoc(userRef);

  if (userSnapshot.exists()) {
    const userData = userSnapshot.data();
    return userData.username;
  } else {
    throw new Error(`User with uid ${uid} not found`);
  }
}

export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}

export const fromMillis = Timestamp.fromMillis;