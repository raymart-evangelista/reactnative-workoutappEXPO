import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Appearance, Button, StyleSheet, Text, View, TextInput } from 'react-native';
import { defaultStyles, lightStyles, darkStyles } from './globalStyles';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'

import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';
import WorkoutsScreen from './WorkoutsScreen';
import MainLoggedOut from './MainLoggedOut';
import TabNavigator from './TabNavigator';

import SignUpScreen from './SignUpScreen';
import LogInScreen from './LogInScreen';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

// function HomeScreen({ navigation, route }) {
//   const [count, setCount] = useState(0)
//   useEffect(() => {
//     if (route.params?.post) {

//     }

//     navigation.setOptions({
//       headerRight: () => (
//         <Button onPress={() => setCount((c) => c + 1)} title="Update count" />
//       )
//     })
//   }, [route.params?.post, navigation])
//   return (
//     <View style={styles.basic}>
//       {/* <Text>Home Screen</Text> */}
//       {/* <Button
//         title="Go to Details"
//         onPress={() => {
//           navigation.navigate('Details', {
//             itemId: 86,
//             otherParam: 'anything you want here',
//           })
//         }}
//       /> */}
//       <Button 
//         title="Create post"
//         onPress={() => navigation.navigate('CreatePost')}
//       />
//       <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
//       <Text>Count: {count}</Text>
//     </View>
//   )
// }

// function SettingsScreen() {
//   return (
//     <View style={styles.basic}>
//       <Text>Settings!</Text>
//     </View>
//   )
// }

// function ProgramsScreen() {
//   return (
//     <View style={styles.basic}>
//       <Text>Workout Programs</Text>
//     </View>
//   )
// }

function CreatePostScreen({ navigation, route }) {
  const [postText, setPostText] = useState('')

  return (
    <>
      <TextInput 
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          navigation.navigate({
            name: 'Home',
            params: { post: postText },
            merge: true,
          })
        }}
      />
    </>
  )
}

function DetailsScreen({ route, navigation }) {
  const { itemId, otherParam } = route.params
  return (
    <View style={styles.basic}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() => 
          navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button 
        title="Go to Details... again.. at least try pressing the button.."
        onPress={() => navigation.navigate('Details')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button 
        title='Go back to first screen in stack'
        onPress={() => navigation.popToTop()}
      />
    </View>
  )
}



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
      <Stack.Navigator initialRouteName='LogIn'>
        <Stack.Screen name="LogIn" component={LogInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
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