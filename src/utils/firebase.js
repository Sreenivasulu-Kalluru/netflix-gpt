// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBxecPDZs3_lazvKMR49b-a9O15Y4u8q5I',
  authDomain: 'netflixgpt-2b561.firebaseapp.com',
  projectId: 'netflixgpt-2b561',
  storageBucket: 'netflixgpt-2b561.appspot.com',
  messagingSenderId: '701069333248',
  appId: '1:701069333248:web:74aac7270d696b573959e5',
  measurementId: 'G-28BE9KBDFK',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
