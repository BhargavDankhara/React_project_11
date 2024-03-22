// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3InuMctBNbtR7ShjZU7Cnp1U6ztFXoJI",
  authDomain: "realtimefirebase-2584c.firebaseapp.com",
  databaseURL: "https://realtimefirebase-2584c-default-rtdb.firebaseio.com",
  projectId: "realtimefirebase-2584c",
  storageBucket: "realtimefirebase-2584c.appspot.com",
  messagingSenderId: "541732152209",
  appId: "1:541732152209:web:2f04b1af5a307f4e443030",
  measurementId: "G-HEH6HB8CN9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
