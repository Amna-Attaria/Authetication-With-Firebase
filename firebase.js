// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword , onAuthStateChanged , sendEmailVerification , signOut , signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCuhktl2yJKAfFKGiYCS_xgy-FKFkvRGgg",
    authDomain: "my-first-project-1bf4a.firebaseapp.com",
    projectId: "my-first-project-1bf4a",
    storageBucket: "my-first-project-1bf4a.appspot.com",
    messagingSenderId: "345778826310",
    appId: "1:345778826310:web:e2246374fc0388fa53ae47",
    measurementId: "G-CD8CX5VHBT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
// Export required methods for `index.js`
export { auth, getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword ,  onAuthStateChanged , sendEmailVerification , signOut,  signInWithPopup, GoogleAuthProvider };
