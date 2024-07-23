// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAC46RxFCp_x1BFIYyMeqMfGWa3ao3UGh0",
  authDomain: "mualaapp-32feb.firebaseapp.com",
  projectId: "mualaapp-32feb",
  storageBucket: "mualaapp-32feb.appspot.com",
  messagingSenderId: "631272198666",
  appId: "1:631272198666:web:f2e293897d390dc8a385f3",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
