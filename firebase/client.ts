// // Import the functions you need from the SDKs you need
// import { initializeApp,getApp,getApps } from "firebase/app";
// import {getAuth} from 'firebase/auth';
// import {getFirestore} from 'firebase/firestore';
// // import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBMrJT9Uu2dKopKDT19a4MYCUNq0y2bd8U",
//   authDomain: "prepwise-22.firebaseapp.com",
//   projectId: "prepwise-22",
//   storageBucket: "prepwise-22.firebasestorage.app",
//   messagingSenderId: "641251977135",
//   appId: "1:641251977135:web:c4a4318249deb40784315a",
//   measurementId: "G-QS8P73Q3JX"
// };

// // Initialize Firebase
// const app = !getApps.length ? initializeApp(firebaseConfig):getApp();
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjinBRrrfg9F5GsrJJ0VQ0Tf1ThKhgzuQ",
  authDomain: "prepwise-9993b.firebaseapp.com",
  projectId: "prepwise-9993b",
  storageBucket: "prepwise-9993b.firebasestorage.app",
  messagingSenderId: "247993190262",
  appId: "1:247993190262:web:b777b6fb6e598288675c57",
  measurementId: "G-29SP9G9804"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig):getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);



