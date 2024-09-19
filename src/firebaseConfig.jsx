
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyApjschDFKW2ZpvrLbrRka44ABBX3XhhXA",
  authDomain: "todo-firestore-335b3.firebaseapp.com",
  projectId: "todo-firestore-335b3",
  storageBucket: "todo-firestore-335b3.appspot.com",
  messagingSenderId: "403934240284",
  appId: "1:403934240284:web:18ae217906a746a2ba89d9",
  measurementId: "G-ZJ5FNCP7P9"
 
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db }; // Ensure both are exported
