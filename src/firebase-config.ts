// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
// const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
// const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
// const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
// const messagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
// const appId = import.meta.env.VITE_FIREBASE_APP_ID;

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: apiKey,
//   authDomain: authDomain,
//   projectId: projectId,
//   storageBucket: storageBucket,
//   messagingSenderId: messagingSenderId,
//   appId: appId,
// };

const firebaseConfig = {
  apiKey: "AIzaSyDNryKj53abrpCdJOQrBpMIFNvCEZObtts",
  authDomain: "docs-clone-c6494.firebaseapp.com",
  projectId: "docs-clone-c6494",
  storageBucket: "docs-clone-c6494.firebasestorage.app",
  messagingSenderId: "332941327509",
  appId: "1:332941327509:web:f0681cc1039da741e4af9c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
