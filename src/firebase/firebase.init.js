// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlTqhkoa_YK0SAuQ8bIT-0Q-2ds5Xx1ME",
  authDomain: "localchefbazaar-31da8.firebaseapp.com",
  projectId: "localchefbazaar-31da8",
  storageBucket: "localchefbazaar-31da8.firebasestorage.app",
  messagingSenderId: "878615671500",
  appId: "1:878615671500:web:da25917ef9beae691cc869"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);