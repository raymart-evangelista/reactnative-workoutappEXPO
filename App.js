import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Appearance, StyleSheet, Text, View } from 'react-native';
import { lightStyles, darkStyles } from './globalStyles';
import MainLoggedOut from './MainLoggedOut';


function HomeScreen() {
  return (
    <View style={styles.basic}>
      <Text>Home Screen</Text>
    </View>
  )
}

function DetailsScreen() {
  return (
    <View style={styles.basic}>
      <Text>Details Screen</Text>
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
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Overview' }} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  basic: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})