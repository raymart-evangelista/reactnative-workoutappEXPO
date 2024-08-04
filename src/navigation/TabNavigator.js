import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import { ExistingProgramsStackScreen } from '../screens/ExistingProgramScreen'
import ProfileScreen from '../screens/ProfileScreen'
import FriendsScreen from '../screens/FriendsScreen'
import { useTheme } from '../themes/ThemeContext'
import HomeStackNavigator from './HomeNavigator'
import ProgramsStackNavigator from './ProgramsNavigator'

const Tab = createBottomTabNavigator()

export default function TabNavigator() {
  const { theme } = useTheme()

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onBackground,
        tabBarStyle: { backgroundColor: theme.colors.background },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Programs"
        component={ProgramsStackNavigator}
        options={
          {
            // headerShown: true,
            // headerTintColor: theme.colors.onBackground,
          }
        }
      />
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={
          {
            // headerShown: true,
            // headerTintColor: theme.colors.onBackground,
          }
        }
      />
      <Tab.Screen
        name="Log"
        component=""
        options={
          {
            // headerShown: true,
            // headerTintColor: theme.colors.onBackground,
          }
        }
      />
      <Tab.Screen
        name="Friends"
        component={FriendsScreen}
        options={
          {
            // headerShown: true,
            // headerTintColor: theme.colors.onBackground,
          }
        }
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={
          {
            // headerShown: true,
            // headerTintColor: theme.colors.onBackground,
          }
        }
      />
    </Tab.Navigator>
  )
}
