import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import CategoryScreen from "../screens/CategoryScreen";
import DishesScreen from "../screens/DishesScreen";
import DishDetailScreen from "../screens/DishDetailScreen";
import { useDispatch } from "react-redux";
import { logoutUser } from "../slices/userSlice";

const AuthenticatedNavigator = () => {
  const dispatch = useDispatch();
  const Stack = createStackNavigator();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      console.log("User logged out successfully");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#F8F9FA' },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="DishList" component={DishesScreen} />
      <Stack.Screen name="DisheDetail" component={DishDetailScreen} />
    </Stack.Navigator>
  );
};

export default AuthenticatedNavigator;
