// GB STUDY Firebase modular SDK configuration (Firebase JS SDK 10.8.0).
// Firebase web apiKey is public client config; protect data with Authentication + Firestore Rules.
import { initializeApp, getApps, getApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

export const firebaseConfig = {
  apiKey: 'AIzaSyDSoCrZuNro0IavuDgGolRp_jQ3fI_mLK4',
  authDomain: 'gb-study-b77fc.firebaseapp.com',
  projectId: 'gb-study-b77fc',
  storageBucket: 'gb-study-b77fc.firebasestorage.app',
  messagingSenderId: '629819146801',
  appId: '1:629819146801:web:47fb8dfefe76b06e220b10',
  measurementId: 'G-GYJR5KCQDN'
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Modular Auth helpers for pages/modules that import this file.
export const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
export const registerUser = (email, pass) => createUserWithEmailAndPassword(auth, email, pass);
export const loginUser = (email, pass) => signInWithEmailAndPassword(auth, email, pass);
export const logoutUser = () => signOut(auth);
