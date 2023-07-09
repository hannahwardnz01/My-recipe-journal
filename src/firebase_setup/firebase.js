import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWdlTSONFhilIa3myuyJDqx9mH1KA2Q-o",
  authDomain: "react-recipe-app-d43aa.firebaseapp.com",
  projectId: "react-recipe-app-d43aa",
  storageBucket: "react-recipe-app-d43aa.appspot.com",
  messagingSenderId: "394989688269",
  appId: "1:394989688269:web:58b332f254e61d4a392084",
  measurementId: "G-5VYD0QXJ3Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)
