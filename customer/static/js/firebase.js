// Import the functions you need from the SDKs you need
import { getAuth } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCniD7IxzTb5mH_Dqpu-XoAdCGiDiHUd8A",
  authDomain: "ein-shot.firebaseapp.com",
  projectId: "ein-shot",
  storageBucket: "ein-shot.appspot.com",
  messagingSenderId: "827543084500",
  appId: "1:827543084500:web:b956134eb9d51610258a41",
  measurementId: "G-JZGRVY7L61"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app)