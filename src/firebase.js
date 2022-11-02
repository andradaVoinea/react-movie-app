import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCgFYNPQC09NGaIzYqqH6pzk_b7x3lWnTk",
  authDomain: "react-movie-app-bda6c.firebaseapp.com",
  projectId: "react-movie-app-bda6c",
  storageBucket: "react-movie-app-bda6c.appspot.com",
  messagingSenderId: "987440814661",
  appId: "1:987440814661:web:9b9b912d127d9e492a212c",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;
