import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { defaultStyles } from "./globalStyles";
import LogInScreen from "./LogInScreen";
import SignUpScreen from "./SignUpScreen";

const Stack = createNativeStackNavigator()

export default function MainLoggedOut() {
  return (
    <Stack.Navigator initialRouteName="SignUpScreen">
      {/* <Stack.Group
        screenOptions={{ headerStyle: { backgroundColor: 'papayawhip' } }}
      > */}
        <Stack.Screen name="LogInScreen" component={LogInScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      {/* </Stack.Group> */}
    </Stack.Navigator>
    // <View style={defaultStyles.basic}>
    //   <TextInput
    //     style={{height: 40}}
    //     placeholder="Username"
    //     onChangeText={newText => setText(newText)}
    //   />
    //   <TouchableOpacity>
    //     <Text>Log in</Text>
    //   </TouchableOpacity>
    //   <TouchableOpacity>
    //     <Text>Sign up</Text>
    //   </TouchableOpacity>
    //   <TouchableOpacity
    //   >
    //     <Text>Create an account</Text>
    //   </TouchableOpacity>
    // </View>
  )
}