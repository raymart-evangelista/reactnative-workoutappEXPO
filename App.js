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

import * as Font from 'expo-font'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()


export default function App() {
  const [fontsLoaded] = Font.useFonts({
    'Montserrat-Bold' : require('./assets/fonts/Montserrat/static/Montserrat-Bold.ttf')
  })

  return (
    <ThemeContextProvider>
      <Stack.Navigator initialRouteName='SignUp' screenOptions={{headerShown: false}}>
        <Stack.Screen name="LogIn" component={LogInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateProgram" component={CreateProgramScreen} />
        <Stack.Screen name="ExistingPrograms" component={ExistingProgramsScreen} />
        <Stack.Screen name="EditProgram" component={EditProgramScreen} />
        {/* <Stack.Screen name="ContinueProgram" component={ContinueProgramScreen} /> */}
        <Stack.Screen name="ProgramInformation" component={ProgramInformationScreen} />
        <Stack.Screen name="ContinueWeek" component={ContinueWeekScreen} />
        <Stack.Screen name="ContinueDay" component={ContinueDayScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
      {/* <Stack.Navigator>
        <Stack.Screen name="Test" component={TestScreen} />
      </Stack.Navigator> */}
    </ThemeContextProvider>
  );
}