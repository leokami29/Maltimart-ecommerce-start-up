// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7ECa5W_BnD5cnRRdTRJPvaqfQugqh_h4",
  authDomain: "maltimart-8a745.firebaseapp.com",
  projectId: "maltimart-8a745",
  storageBucket: "maltimart-8a745.appspot.com",
  messagingSenderId: "668865186981",
  appId: "1:668865186981:web:9ed048d656ad07852c914c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db =  getFirestore(app)
export const storage = getStorage(app)

export default app 