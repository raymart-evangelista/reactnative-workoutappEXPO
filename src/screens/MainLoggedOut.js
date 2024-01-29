import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { defaultStyles } from "./globalStyles";
import LogInScreen from "./LogInScreen";
import SignUpScreen from "./SignUpScreen";

const Stack = createNativeStackNavigator();

export default function MainLoggedOut() {
  return (
    <Stack.Navigator initialRouteName="LogInScreen">
      <Stack.Screen name="LogInScreen" component={LogInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    </Stack.Navigator>
  );
}
