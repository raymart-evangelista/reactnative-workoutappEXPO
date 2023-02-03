import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainLoggedOut from "./MainLoggedOut";

const Tab = createBottomTabNavigator()

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='MainLoggedOut' component={MainLoggedOut} />
    </Tab.Navigator>
  )
}