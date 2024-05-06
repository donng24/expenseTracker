import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCMwu20kw2SfpjR28G8Xv_eJEJhrquVUfA",
  authDomain: "expense-358c6.firebaseapp.com",
  projectId: "expense-358c6",
  storageBucket: "gs://expense-358c6.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
