// Firebase initialization module (ESM)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

// Firebase configuration template.
// INSTRUCTIONS:
// 1. Copy this file to firebase-config.js (already done in local, but for new devs)
// 2. Replace the placeholders with your actual Firebase project credentials.
// 3. For GitHub Actions or Hosting, use environment variables.

const firebaseConfig = {
  projectId: "acollectiondb",
  appId: "1:421607360170:web:75fd91266c7276654432d3",
  storageBucket: "acollectiondb.firebasestorage.app",
  apiKey: "AIzaSyAGkVON0QsYHTSPEsUb8wngSsNA_hBE6Ck",
  authDomain: "acollectiondb.firebaseapp.com",
  messagingSenderId: "421607360170",
  measurementId: "G-HE2PLJMRXT"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
