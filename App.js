import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Appearance, Button, StyleSheet, Text, View, TextInput } from 'react-native';
import { defaultStyles, lightStyles, darkStyles } from './src/styles/globalStyles'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'

import LogInScreen from './src/screens/LogInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen';
import { ProgramNameInputScreen } from './src/screens/CreateProgramScreen';
import { ExistingProgramsScreen, EditProgramScreen } from './src/screens/ExistingProgramScreen';
import { ProgramInformationScreen, ContinueWeekScreen, ContinueDayScreen } from './src/screens/ContinueProgramScreen';
import SettingsScreen from './src/screens/SettingsScreen';

import { lightTheme, darkTheme } from './src/themes/theme';


const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <PaperProvider theme={lightTheme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="LogIn" component={LogInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="CreateProgram" component={ProgramNameInputScreen} />
          <Stack.Screen name="ExistingPrograms" component={ExistingProgramsScreen} />
          <Stack.Screen name="EditProgram" component={EditProgramScreen} />
          {/* <Stack.Screen name="ContinueProgram" component={ContinueProgramScreen} /> */}
          <Stack.Screen name="ProgramInformation" component={ProgramInformationScreen} />
          <Stack.Screen name="ContinueWeek" component={ContinueWeekScreen} />
          <Stack.Screen name="ContinueDay" component={ContinueDayScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}