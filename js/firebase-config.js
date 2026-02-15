/**
 * Firebase Configuration and Initialization
 *
 * SECURITY NOTE: Firebase config is safe to expose in client-side code
 * Security is handled by Firestore Security Rules, not by hiding these values
 *
 * To use your own Firebase project:
 * 1. Replace the firebaseConfig object below with your project's config
 * 2. Get it from: Firebase Console > Project Settings > Your apps > Web app
 */

// TODO: Replace this with your actual Firebase configuration
// Get it from: https://console.firebase.google.com/ > Project Settings
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-lite.js";

const firebaseConfig = {
    apiKey: "AIzaSyAW2uOYbgqQ3G_7krgW-PM4nQ8vQfA3l_k",
    authDomain: "certquiz-aada9.firebaseapp.com",
    projectId: "certquiz-aada9",
    storageBucket: "certquiz-aada9.firebasestorage.app",
    messagingSenderId: "212386801853",
    appId: "1:212386801853:web:70081b404d35cd265cafd4",
    measurementId: "G-S1J6NPS95T"
};

const app = initializeApp(firebaseConfig);
const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
const forceFirebase = searchParams ? searchParams.get('firebase') === '1' : false;
const isGitHubPages = hostname.endsWith('.github.io');
const FIREBASE_ENABLED = !isGitHubPages || forceFirebase;
const db = FIREBASE_ENABLED ? getFirestore(app) : null;

console.log("✅ Firebase v9 initialized");
console.log('[Firebase Debug] Runtime config', {
    hostname,
    origin: typeof window !== 'undefined' ? window.location.origin : null,
    isGitHubPages,
    forceFirebase,
    FIREBASE_ENABLED,
    projectId: firebaseConfig.projectId
});
if (!FIREBASE_ENABLED) {
    console.warn('Firebase disabled on GitHub Pages. Add ?firebase=1 to force-enable.');
}

export { db, FIREBASE_ENABLED };
