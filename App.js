import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Appearance, Button, StyleSheet, Text, View, TextInput, useColorScheme } from 'react-native';
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

import { lightTheme, lightTheme2, darkTheme, darkTheme2 } from './src/themes/theme';

import { NativeWindStyleSheet } from 'nativewind';

NativeWindStyleSheet.setOutput({
  default: "native",
})


const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()



export default function App() {

  const colorScheme = Appearance.getColorScheme()
  console.log(colorScheme)
  let [deviceTheme, setDeviceTheme] = useState(colorScheme === 'dark' ? darkTheme2 : lightTheme2)

  return (

    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-red-500">Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
      // <NavigationContainer>
      //   <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
      //     <Stack.Screen name="LogIn" component={LogInScreen} />
      //     <Stack.Screen name="SignUp" component={SignUpScreen} />
      //     <Stack.Screen name="Home" component={HomeScreen} />
      //     <Stack.Screen name="CreateProgram" component={ProgramNameInputScreen} />
      //     <Stack.Screen name="ExistingPrograms" component={ExistingProgramsScreen} />
      //     <Stack.Screen name="EditProgram" component={EditProgramScreen} />
      //     {/* <Stack.Screen name="ContinueProgram" component={ContinueProgramScreen} /> */}
      //     <Stack.Screen name="ProgramInformation" component={ProgramInformationScreen} />
      //     <Stack.Screen name="ContinueWeek" component={ContinueWeekScreen} />
      //     <Stack.Screen name="ContinueDay" component={ContinueDayScreen} />
      //     <Stack.Screen name="Settings" component={SettingsScreen} />
      //   </Stack.Navigator>
      // </NavigationContainer>
  );
}