import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Appearance, StyleSheet, Text, View, TextInput, useColorScheme } from 'react-native';
import { defaultStyles, lightStyles, darkStyles } from './src/styles/globalStyles'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { DefaultTheme, Button, Headline, Provider as PaperProvider } from 'react-native-paper'

import LogInScreen from './src/screens/LogInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen';
import CreateProgramScreen from './src/screens/CreateProgramScreen';
import { ExistingProgramsScreen, EditProgramScreen } from './src/screens/ExistingProgramScreen';
import { ProgramInformationScreen, ContinueWeekScreen, ContinueDayScreen } from './src/screens/ContinueProgramScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { ThemeContextProvider, useTheme } from './src/themes/ThemeContext';

import LandingPage from './src/screens/LandingPage';

const Stack = createNativeStackNavigator()

import AuthProvider from './src/contexts/AuthContext';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TabNavigator from './src/navigation/TabNavigator';

export default function App() {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <ThemeContextProvider>
          <NavigationContainer independent={true}>
          {/* <Stack.Navigator initialRouteName='CreateProgram' screenOptions={{headerShown: true}}> */}
            <Stack.Navigator initialRouteName='TabNavigator'>
              <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false}}/>
              {/* <Stack.Screen name="Landing" component={LandingPage} /> */}
              {/* <Stack.Screen name="LogIn" component={LogInScreen} /> */}
              {/* <Stack.Screen name="SignUp" component={SignUpScreen} /> */}
              {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
              {/* <Stack.Screen name="CreateProgram" component={CreateProgramScreen} options={{ title: 'Create' }} /> */}
              {/* <Stack.Screen name="ExistingPrograms" component={ExistingProgramsScreen} /> */}
              {/* <Stack.Screen name="EditProgram" component={EditProgramScreen} /> */}
              {/* <Stack.Screen name="ContinueProgram" component={OldContinueProgramScreen} /> */}
              {/* <Stack.Screen name="ProgramInformation" component={ProgramInformationScreen} /> */}
              {/* <Stack.Screen name="ContinueWeek" component={ContinueWeekScreen} /> */}
              {/* <Stack.Screen name="ContinueDay" component={ContinueDayScreen} /> */}
              {/* <Stack.Screen name="Settings" component={SettingsScreen} /> */}
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeContextProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}