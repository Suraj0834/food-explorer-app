import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserStorage } from "../utils/storage";
import { 
  signUpWithEmail, 
  signInWithEmail, 
  signOutUser, 
  onAuthStateChange,
  getCurrentUser,
  getUserData
} from "../services/firebaseAuth";

const initialState = {
  isUserLoggedIn: false,
  loading: false,
  user: null,
  userData: null,
  error: null,
};

// Check authentication state on app start
export const checkAuthState = createAsyncThunk(
  'user/checkAuthState',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      console.log("Checking Firebase authentication...");
      
      return new Promise((resolve) => {
        const unsubscribe = onAuthStateChange(async (firebaseUser) => {
          if (firebaseUser) {
            console.log("Firebase user authenticated:", firebaseUser.email);
            
            // Get additional user data from Firestore
            try {
              const userData = await getUserData(firebaseUser.uid);
              
              // Store user data locally for offline access
              if (userData) {
                await UserStorage.setUserData(userData);
                await UserStorage.setToken(firebaseUser.uid);
                await UserStorage.setLastLogin(Date.now());
              }
              
              dispatch(setIsUSerLoggedIn(true));
              dispatch(setUser(firebaseUser));
              dispatch(setUserData(userData));
              dispatch(setError(null));
            } catch (error) {
              console.log("Error getting user data:", error);
              // Still set basic user info even if Firestore fails
              dispatch(setIsUSerLoggedIn(true));
              dispatch(setUser(firebaseUser));
              dispatch(setUserData(null));
            }
          } else {
            console.log("No Firebase user authenticated");
            // Clear local storage
            await UserStorage.clearUserData();
            
            dispatch(setIsUSerLoggedIn(false));
            dispatch(setUser(null));
            dispatch(setUserData(null));
            dispatch(setError(null));
          }
          
          dispatch(setLoading(false));
          unsubscribe();
          resolve();
        });
      });
    } catch (error) {
      console.log("Error checking authentication:", error);
      dispatch(setIsUSerLoggedIn(false));
      dispatch(setUser(null));
      dispatch(setUserData(null));
      dispatch(setLoading(false));
    }
  }
);

// Sign up with Firebase
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (credentials, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      
      console.log("Registering user with Firebase:", credentials.email);
      
      const { email, password, displayName } = credentials;
      const result = await signUpWithEmail(email, password, displayName);
      
      // Store user data locally
      if (result.userData) {
        await UserStorage.setUserData(result.userData);
        await UserStorage.setToken(result.user.uid);
        await UserStorage.setLastLogin(Date.now());
      }
      
      dispatch(setIsUSerLoggedIn(true));
      dispatch(setUser(result.user));
      dispatch(setUserData(result.userData));
      
      console.log("Registration successful");
      return { success: true, user: result.user };
    } catch (error) {
      console.log("Registration error:", error);
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// Sign in with Firebase
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      
      console.log("Logging in user with Firebase:", credentials.email);
      
      const { email, password } = credentials;
      const result = await signInWithEmail(email, password);
      
      // Store user data locally
      if (result.userData) {
        await UserStorage.setUserData(result.userData);
        await UserStorage.setToken(result.user.uid);
        await UserStorage.setLastLogin(Date.now());
      }
      
      dispatch(setIsUSerLoggedIn(true));
      dispatch(setUser(result.user));
      dispatch(setUserData(result.userData));
      
      console.log("Login successful");
      return { success: true, user: result.user };
    } catch (error) {
      console.log("Login error:", error);
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// Sign out with Firebase
export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { dispatch }) => {
    try {
      console.log("Logging out user from Firebase");
      
      await signOutUser();
      
      // Clear local storage
      await UserStorage.clearUserData();
      
      dispatch(setIsUSerLoggedIn(false));
      dispatch(setUser(null));
      dispatch(setUserData(null));
      dispatch(setError(null));
      
      console.log("Logout successful");
    } catch (error) {
      console.log("Logout error:", error);
      // Even if Firebase logout fails, clear local state
      await UserStorage.clearUserData();
      dispatch(setIsUSerLoggedIn(false));
      dispatch(setUser(null));
      dispatch(setUserData(null));
      dispatch(setError(null));
    }
  }
);

// Get current user data
export const getCurrentUserData = createAsyncThunk(
  'user/getCurrentUserData',
  async (_, { dispatch, getState }) => {
    try {
      const state = getState();
      const user = state.user.user;
      
      if (user && user.uid) {
        const userData = await getUserData(user.uid);
        if (userData) {
          await UserStorage.setUserData(userData);
          dispatch(setUserData(userData));
        }
      }
    } catch (error) {
      console.log("Error getting current user data:", error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setIsUSerLoggedIn: (state, action) => {
      state.isUserLoggedIn = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearUserData: (state) => {
      state.isUserLoggedIn = false;
      state.user = null;
      state.userData = null;
      state.error = null;
    },
  },
});

export const { 
  setIsUSerLoggedIn, 
  setLoading, 
  setUser, 
  setUserData,
  setError,
  clearError,
  clearUserData 
} = userSlice.actions;

export default userSlice.reducer;
