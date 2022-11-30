// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
 apiKey: "AIzaSyBvTaQqMD3yVs7XhLF780zt3S-crfefbGk",
 authDomain: "wonder-meals-pwa.firebaseapp.com",
 projectId: "wonder-meals-pwa",
 storageBucket: "wonder-meals-pwa.appspot.com",
 messagingSenderId: "843720539616",
 appId: "1:843720539616:web:fd2f7b0c153d6437677f85"
//  apiKey: "AIzaSyBne3fHUdbNcIjBRv1Koy39vse1VRZbNOo",
//  authDomain: "wonder-273f7.firebaseapp.com",
//  projectId: "wonder-273f7",
//  storageBucket: "wonder-273f7.appspot.com",
//  messagingSenderId: "703492327156",
//  appId: "1:703492327156:web:f967c04b46861036f040a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const firestore = getFirestore();
export default app
