// Firebase initialization module (ESM)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

const firebaseConfig = {
    projectId: "acollectiondb",
    appId: "1:421607360170:web:a95646f8ab33bdb54432d3",
    storageBucket: "acollectiondb.firebasestorage.app",
    apiKey: "AIzaSyCYcAzY0cvQZM6toChHDqF1IxLDZe5WhNE",
    authDomain: "acollectiondb.firebaseapp.com",
    messagingSenderId: "421607360170",
    measurementId: "G-0B2K9M4RLE"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
