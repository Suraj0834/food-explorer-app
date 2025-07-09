import { initializeApp, getApps } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "food-explorer-app-9fb6a.firebaseapp.com",
  projectId: "food-explorer-app-9fb6a",
  storageBucket: "food-explorer-app-9fb6a.firebasestorage.app",
  messagingSenderId: "1005920493587",
  appId: "1:1005920493587:web:8322f3d9e3ec7654cc9fe6",
  measurementId: "G-MXNWVHQYDY"
};

// Initialize Firebase only if no apps exist
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Auth with AsyncStorage persistence
let auth;
try {
  auth = getAuth(app);
} catch (error) {
  // If auth is already initialized, create a new one with persistence
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
}

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };
export default app; 
