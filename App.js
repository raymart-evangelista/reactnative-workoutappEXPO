import 'react-native-get-random-values'
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import {
  Appearance,
  StyleSheet,
  Text,
  View,
  TextInput,
  useColorScheme,
} from 'react-native'
import {
  defaultStyles,
  lightStyles,
  darkStyles,
} from './src/styles/globalStyles'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
  DefaultTheme,
  Button,
  Headline,
  Provider as PaperProvider,
} from 'react-native-paper'
import { NativeWindStyleSheet } from 'nativewind'

import LogInScreen from './src/screens/LogInScreen'
import SignUpScreen from './src/screens/SignUpScreen'
import HomeScreen from './src/screens/HomeScreen'
import CreateProgramScreen from './src/screens/CreateProgramScreen'
import {
  ExistingProgramsScreen,
  EditProgramScreen,
} from './src/screens/ExistingProgramScreen'
import {
  ProgramInformationScreen,
  ContinueWeekScreen,
  ContinueDayScreen,
} from './src/screens/ContinueProgramScreen'
import SettingsScreen from './src/screens/SettingsScreen'
import { ThemeContextProvider, useTheme } from './src/themes/ThemeContext'

import LandingPage from './src/screens/LandingPage'

const Stack = createNativeStackNavigator()

import AuthProvider from './src/contexts/AuthContext'

import { GestureHandlerRootView } from 'react-native-gesture-handler'
import TabNavigator from './src/navigation/TabNavigator'

import { Provider as ReduxProvider } from 'react-redux'
import store from './src/app/store'

import { SafeAreaProvider } from 'react-native-safe-area-context'

import { RealmProvider } from '@realm/react'
import {
  Program,
  Week,
  Day,
  Exercise,
  Sets,
  Reps,
  RPE,
} from './src/models/Program'

import { User } from './src/models/User'

export default function App() {
  return (
    <RealmProvider
      schema={[Program, Week, Day, Exercise, Sets, Reps, RPE]}
      deleteRealmIfMigrationNeeded={true}
    >
      <ReduxProvider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <AuthProvider>
              <ThemeContextProvider>
                <AppContent />
              </ThemeContextProvider>
            </AuthProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </ReduxProvider>
    </RealmProvider>
  )
}

function AppContent() {
  const { theme } = useTheme()

  return (
    <NavigationContainer theme={theme}>
      {/* <Stack.Navigator initialRouteName='CreateProgram' screenOptions={{headerShown: true}}> */}
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Landing" component={LandingPage} />
        <Stack.Screen name="LogIn" component={LogInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

NativeWindStyleSheet.setOutput({
  default: 'native',
})
