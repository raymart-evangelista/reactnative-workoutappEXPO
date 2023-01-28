import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Appearance, StyleSheet, Text, View } from 'react-native';
import { lightStyles, darkStyles } from './globalStyles';
import MainLoggedOut from './MainLoggedOut';


function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  )
}

const Stack = createNativeStackNavigator()

export default function App() {
  // const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme())
  // const themeStyles = colorScheme === 'dark' ? darkStyles : lightStyles

  // useEffect(() => {
  //   const themeSubscription = Appearance.addChangeListener(({ colorScheme }) => {
  //     setColorScheme(colorScheme)
  //   })

  //   return () => themeSubscription.remove()
  // })

  // console.log(colorScheme)

  return (
    <NavigationContainer>
      {/* <View style={themeStyles.container}>
        <MainLoggedOut />
        <StatusBar style="auto" />
      </View> */}
      <Stack.Navigator>
        <Stack.Screen name="Home Screen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
