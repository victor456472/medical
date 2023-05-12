import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { 
    getFirestore, 
    collection, 
    addDoc,
    getDocs,
    onSnapshot,
    deleteDoc,
    doc,
    getDoc,
    updateDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_FIREBASE_APIKEY,
    authDomain: import.meta.env.VITE_API_FIREBASE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_API_FIREBASE_PROJECTID,
    storageBucket: import.meta.env.VITE_API_FIREBASE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_API_FIREBASE_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_API_FIREBASE_APPID,
    measurementId: import.meta.env.VITE_API_FIREBASE_MEASUREMENTID
}

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export {
    db,
    auth,
    collection,
    doc
}
