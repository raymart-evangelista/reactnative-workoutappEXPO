import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { ExistingProgramsStackScreen } from "../screens/ExistingProgramScreen";
import ProfileScreen from "../screens/ProfileScreen";
import FriendsScreen from "../screens/FriendsScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Programs"
        component={ExistingProgramsStackScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Home" component={HomeScreen} />
      {/* <Tab.Screen name='Programs' component={ExistingProgramsScreen} /> */}
      <Tab.Screen name="Log" component="" />
      <Tab.Screen name="Friends" component={FriendsScreen} />
      <Tab.Screen name="You" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
