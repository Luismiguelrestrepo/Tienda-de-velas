// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCCAmqIggpXfOBUJkUU945OI8CYSnWtr2E",
    authDomain: "estrella-de-oriente-572ab.firebaseapp.com",
    projectId: "estrella-de-oriente-572ab",
    storageBucket: "estrella-de-oriente-572ab.firebasestorage.app",
    messagingSenderId: "1014000869454",
    appId: "1:1014000869454:web:9fbf170ea81410fadb631f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
