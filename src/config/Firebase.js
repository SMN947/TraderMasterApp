import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB7F2FrgQ2oF_OxAjaQNJftTworIIFWcmQ",
  authDomain: "trademaster-da2f5.firebaseapp.com",
  projectId: "trademaster-da2f5",
  storageBucket: "trademaster-da2f5.appspot.com",
  messagingSenderId: "440841901349",
  appId: "1:440841901349:web:d4876f94854782a64d36cc",
  measurementId: "G-ESP19CRMVE"
};
initializeApp(firebaseConfig);
export const auth = getAuth();