import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCa1yaXqX3juDdinSR5IY1KVsMct2cXZYU",
  authDomain: "admin-dashboard-d8c28.firebaseapp.com",
  projectId: "admin-dashboard-d8c28",
  storageBucket: "admin-dashboard-d8c28.appspot.com",
  messagingSenderId: "1061110961820",
  appId: "1:1061110961820:web:9a4b0a98348de7d0083f59",
  measurementId: "G-P5ZD3DTQLE"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);