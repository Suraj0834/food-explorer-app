import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthenticatedNavigator from "./CustomNavigator/AuthenticatedNavigator";
import UnAuthenticatedNavigator from "./CustomNavigator/UnAuthenticatedNavigator";
import { useSelector, useDispatch } from "react-redux";
import { checkAuthState } from "./slices/userSlice";
import SplashScreen from "./components/SplashScreen";

export default function App() {
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector((state) => state.user.isUserLoggedIn);
  const loading = useSelector((state) => state.user.loading);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Show splash screen for 2.5 seconds
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    // Check Firebase authentication state
    dispatch(checkAuthState());

    return () => clearTimeout(splashTimer);
  }, [dispatch]);

  useEffect(() => {
    console.log("User login status:", isUserLoggedIn);
  }, [isUserLoggedIn]);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#075E54" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isUserLoggedIn ? (
        <AuthenticatedNavigator />
      ) : (
        <UnAuthenticatedNavigator />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#075E54',
    fontWeight: '500',
  },
});
