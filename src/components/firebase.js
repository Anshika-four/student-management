import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB4jY6BfaRnNvbRUvYU6l1IjUiClfxZaHI",
  authDomain: "student-management-13e1c.firebaseapp.com",
  projectId: "student-management-13e1c",
  storageBucket: "student-management-13e1c.firebasestorage.app",
  messagingSenderId: "396167320710",
  appId: "1:396167320710:web:dc92ba29a83ea253d16d07"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db=getFirestore(app);
export default app;