import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Appearance, Button, StyleSheet, Text, View, TextInput } from 'react-native';
import { defaultStyles, lightStyles, darkStyles } from './src/styles/globalStyles'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'

import LogInScreen from './src/screens/LogInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen';
import { ProgramNameInputScreen, AddWeeksScreen, WeeksSelectableScreen, AddDaysScreen, DayDetailsScreen, ProgramDetailsScreen } from './src/screens/CreateProgramScreen';
import { ExistingProgramsScreen, EditProgramScreen } from './src/screens/ExistingProgramScreen';

import { Provider as PaperProvider } from 'react-native-paper'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="LogIn" component={LogInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="CreateProgram" component={ProgramNameInputScreen} />
          <Stack.Screen name="AddWeeks" component={AddWeeksScreen} />
          <Stack.Screen name="WeeksSelectable" component={WeeksSelectableScreen} />
          <Stack.Screen name="AddDays" component={AddDaysScreen} />
          <Stack.Screen name="DayDetails" component={DayDetailsScreen} />
          <Stack.Screen name="Details" component={ProgramDetailsScreen} />
          <Stack.Screen name="ExistingPrograms" component={ExistingProgramsScreen} />
          <Stack.Screen name="EditProgram" component={EditProgramScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  basic: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
}) 