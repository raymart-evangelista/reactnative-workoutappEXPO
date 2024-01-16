import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { ExistingProgramsScreen } from "../screens/ExistingProgramScreen";

const Tab = createBottomTabNavigator()

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Programs' component={ExistingProgramsScreen} />
      <Tab.Screen name='Log' component='' />
      <Tab.Screen name='Leaderboards' component='' />
      <Tab.Screen name='You' component='' />
    </Tab.Navigator>
  )
}