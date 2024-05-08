import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'

const HomeStack = createNativeStackNavigator()

export default function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      {/* <HomeStack.Screen name="MyPrograms" component={MyProgramsScreen} /> */}
    </HomeStack.Navigator>
  )
}
