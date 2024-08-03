import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProgramsHomeScreen from '../screens/ProgramsHomeScreen'
import {
  CreateProgramScreen,
  EditDayScreen,
  EditWeekScreen,
} from '../screens/CreateProgramScreen'
import MyProgramsScreen from '../screens/MyProgramsScreen'
import ProgramDetailsScreen from '../screens/ProgramDetailsScreen'

const ProgramsStack = createNativeStackNavigator()

export default function ProgramsStackNavigator() {
  return (
    <ProgramsStack.Navigator>
      <ProgramsStack.Screen
        name="ProgramsHome"
        component={ProgramsHomeScreen}
        options={{ headerShown: false }}
      />
      <ProgramsStack.Screen
        name="CreateProgram"
        component={CreateProgramScreen}
        // options={{ headerShown: false }}
      />
      <ProgramsStack.Screen
        name="MyPrograms"
        component={MyProgramsScreen}
        // options={{ headerShown: false }}
      />
      {/* <ProgramsStack.Screen name="" component={} options={{ headerShown: false}}/> */}
      <ProgramsStack.Screen
        name="ProgramDetails"
        component={ProgramDetailsScreen}
      />
      <ProgramsStack.Screen name="EditWeek" component={EditWeekScreen} />
      <ProgramsStack.Screen name="EditDay" component={EditDayScreen} />
    </ProgramsStack.Navigator>
  )
}
