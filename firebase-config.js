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
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
