# Firebase Setup Guide

This guide will help you set up Firebase authentication and Firestore for your Food Explorer app.

## Prerequisites

1. A Firebase project (create one at [Firebase Console](https://console.firebase.google.com/))
2. Firebase project with Authentication and Firestore enabled

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "food-explorer-app")
4. Follow the setup wizard
5. Enable Google Analytics (optional)

## Step 2: Enable Authentication

1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" authentication
5. Click "Save"

## Step 3: Enable Firestore Database

1. In your Firebase project, go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location for your database
5. Click "Done"

## Step 4: Get Firebase Configuration

1. In your Firebase project, click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>)
5. Register your app with a nickname (e.g., "Food Explorer Web")
6. Copy the configuration object

## Step 5: Update Firebase Configuration

1. Open `config/firebase.js` in your project
2. Replace the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your_actual_api_key_here",
  authDomain: "your_project_id.firebaseapp.com",
  projectId: "your_project_id",
  storageBucket: "your_project_id.appspot.com",
  messagingSenderId: "your_sender_id",
  appId: "your_app_id"
};
```

## Step 6: Set Up Firestore Security Rules

1. In your Firebase project, go to "Firestore Database"
2. Click "Rules" tab
3. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Public read access for categories and dishes
    match /categories/{categoryId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /dishes/{dishId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Step 7: Test the Setup

1. Start your app: `npm start`
2. Try to register a new user
3. Check Firebase Console > Authentication to see the new user
4. Check Firebase Console > Firestore Database to see the user document

## Features Implemented

### Authentication
- ✅ Email/Password registration
- ✅ Email/Password login
- ✅ Secure logout
- ✅ Persistent authentication state
- ✅ Error handling with user-friendly messages

### User Data Storage
- ✅ User profiles stored in Firestore
- ✅ Automatic user document creation on registration
- ✅ Last login tracking
- ✅ Profile updates

### Security
- ✅ Firebase Auth for secure authentication
- ✅ Firestore security rules
- ✅ Local storage for offline access
- ✅ Token-based authentication

## File Structure

```
├── config/
│   └── firebase.js          # Firebase configuration
├── services/
│   └── firebaseAuth.js      # Firebase authentication services
├── slices/
│   └── userSlice.js         # Redux slice with Firebase integration
├── utils/
│   └── storage.js           # Local storage utilities
└── screens/
    ├── LoginScreen.js       # Login with Firebase
    └── RegisterScreen.js    # Registration with Firebase
```

## Error Handling

The app includes comprehensive error handling for common Firebase errors:

- Invalid email format
- Weak passwords
- Email already in use
- User not found
- Wrong password
- Network errors
- Too many failed attempts

## Offline Support

- User data is cached locally using AsyncStorage
- App works offline with cached data
- Automatic sync when connection is restored

## Next Steps

1. Add password reset functionality
2. Implement social authentication (Google, Facebook)
3. Add user profile management
4. Implement data synchronization
5. Add push notifications

## Troubleshooting

### Common Issues

1. **"Firebase App named '[DEFAULT]' already exists"**
   - This is normal if you're hot reloading
   - The app handles this automatically

2. **"Permission denied" errors**
   - Check your Firestore security rules
   - Ensure authentication is working properly

3. **Network errors**
   - Check your internet connection
   - Verify Firebase configuration is correct

4. **"Invalid API key" errors**
   - Double-check your Firebase configuration
   - Ensure you're using the web API key, not the server key

### Getting Help

- Check Firebase documentation: https://firebase.google.com/docs
- Review Firebase Console for error logs
- Check React Native Firebase documentation 