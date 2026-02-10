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
const firebaseConfig = {
    apiKey: "AIzaSyAW2uOYbgqQ3G_7krgW-PM4nQ8vQfA3l_k",
    authDomain: "certquiz-aada9.firebaseapp.com",
    projectId: "certquiz-aada9",
    storageBucket: "certquiz-aada9.firebasestorage.app",
    messagingSenderId: "212386801853",
    appId: "1:212386801853:web:70081b404d35cd265cafd4",
    measurementId: "G-S1J6NPS95T"
};

// Initialize Firebase
let db = null;

try {
    // Check if config is set
    if (!firebaseConfig.apiKey || firebaseConfig.apiKey === "YOUR_FIREBASE_API_KEY") {
        throw new Error('Firebase configuration not set. Please update firebase-config.js with your Firebase project details.');
    }

    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    
    // Configure Firestore settings to ensure production mode
    // This helps prevent "local address space" CORS errors on GitHub Pages
    db.settings({
        ignoreUndefinedProperties: true
    });
    
    console.log('✅ Firebase initialized successfully');
} catch (error) {
    console.error('❌ Error initializing Firebase:', error.message);
    console.error('Please update js/firebase-config.js with your Firebase project configuration.');
}

export { db };
