import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';

// User data structure in Firestore
const createUserData = (user, additionalData = {}) => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName || user.email.split('@')[0],
  photoURL: user.photoURL || null,
  createdAt: new Date().toISOString(),
  lastLogin: new Date().toISOString(),
  isActive: true,
  ...additionalData
});

// Sign up with email and password
export const signUpWithEmail = async (email, password, displayName = null) => {
  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update profile if display name is provided
    if (displayName) {
      await updateProfile(user, {
        displayName: displayName
      });
    }

    // Create user document in Firestore after user is created
    const userData = createUserData(user, { displayName });
    
    // Use the user's UID as the document ID
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, userData);

    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || displayName,
        photoURL: user.photoURL,
      },
      userData
    };
  } catch (error) {
    console.error('Sign up error:', error);
    throw {
      code: error.code,
      message: getErrorMessage(error.code)
    };
  }
};

// Sign in with email and password
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update last login in Firestore
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, {
      lastLogin: new Date().toISOString(),
      isActive: true
    });

    // Get updated user data
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();

    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
      userData
    };
  } catch (error) {
    console.error('Sign in error:', error);
    throw {
      code: error.code,
      message: getErrorMessage(error.code)
    };
  }
};

// Sign out
export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Sign out error:', error);
    throw {
      code: error.code,
      message: getErrorMessage(error.code)
    };
  }
};

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Listen to auth state changes
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Get user data from Firestore
export const getUserData = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    console.error('Get user data error:', error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (uid, updates) => {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });

    // Also update Firebase Auth profile if displayName is provided
    if (updates.displayName && auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: updates.displayName
      });
    }

    return { success: true };
  } catch (error) {
    console.error('Update profile error:', error);
    throw {
      code: error.code,
      message: getErrorMessage(error.code)
    };
  }
};

// Reset password
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    console.error('Reset password error:', error);
    throw {
      code: error.code,
      message: getErrorMessage(error.code)
    };
  }
};

// Check if email exists
export const checkEmailExists = async (email) => {
  try {
    const q = query(collection(db, 'users'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Check email exists error:', error);
    throw error;
  }
};

// Error message mapping
const getErrorMessage = (errorCode) => {
  const errorMessages = {
    'auth/user-not-found': 'No account found with this email address.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/weak-password': 'Password should be at least 6 characters long.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/operation-not-allowed': 'This operation is not allowed.',
    'auth/invalid-credential': 'Invalid credentials.',
    'permission-denied': 'Access denied. Please check your permissions.',
  };
  
  return errorMessages[errorCode] || 'An error occurred. Please try again.';
}; 