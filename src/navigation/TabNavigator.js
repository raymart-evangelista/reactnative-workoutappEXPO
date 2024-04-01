import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import { ExistingProgramsStackScreen } from '../screens/ExistingProgramScreen'
import ProfileScreen from '../screens/ProfileScreen'
import FriendsScreen from '../screens/FriendsScreen'
import { useTheme } from '../themes/ThemeContext'

const Tab = createBottomTabNavigator()

export default function TabNavigator() {
  const { theme } = useTheme()
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onBackground,
        tabBarStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Tab.Screen
        name="Programs"
        component={ExistingProgramsStackScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Home" component={HomeScreen} />
      {/* <Tab.Screen name="Programs" component={ExistingProgramsScreen} /> */}
      <Tab.Screen name="Log" component="" />
      <Tab.Screen name="Friends" component={FriendsScreen} />
      <Tab.Screen name="You" component={ProfileScreen} />
    </Tab.Navigator>
  )
}
