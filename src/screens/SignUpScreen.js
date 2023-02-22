import { useState } from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { defaultStyles } from "../styles/globalStyles"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

import signUpService from '../services/users'
import Notification from "../components/Notification";

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationColor, setNotificationColor] = useState('')

  const handleSubmit = async () => {
    if (username === '' || email === '' || password === '' ) {
      setNotificationMessage("All fields are required")
      setNotificationColor('red')
      return
    }

    try {
      const returnedInfo = await signUpService.signUp(username, email, password)
      console.log(returnedInfo)
      // alert("Sign Up Successful.")
      setNotificationMessage("Success")
      setNotificationColor('green')
    } catch (error) {
      console.error(error)
      setNotificationMessage("Sign up failed")
      setNotificationColor('red')
      // alert("Something went wrong. Please try again.")
    }

  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={defaultStyles.basic}>
      <View style={defaultStyles.basic}>
        <Notification message={notificationMessage} color={notificationColor} />
        <Text style={defaultStyles.signupText}>Sign Up</Text>
        <View style={{ marginHorizontal: 24 }}>
          <TextInput
            style={defaultStyles.signupInput}
            placeholder="Username"
            onChangeText={newUsername => setUsername(newUsername)}
            autoCapitalize={false}
            autoCorrect={false}
          />
        </View>
        <View style={{ marginHorizontal: 24 }}>
          <TextInput
            style={defaultStyles.signupInput}
            placeholder="Email"
            onChangeText={newEmail => setEmail(newEmail)}
            autoCapitalize={false}
            autoCorrect={false}
            autoComplete="email"
            keyboardType="email-address"
          />
        </View>
        <View style={{ marginHorizontal: 24 }}>
          <TextInput
            style={defaultStyles.signupInput}
            placeholder="Password"
            onChangeText={newPassword => setPassword(newPassword)}
            autoCapitalize={false}
            autoCorrect={false}
            autoComplete="password"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          onPress={handleSubmit}
          style={defaultStyles.buttonStyle}
        >
          <Text
            style={defaultStyles.buttonText}
          >
            Submit
          </Text>
        </TouchableOpacity>
        <Text 
          style={{ color: 'black', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}
          onPress={() => navigation.navigate("LogIn")}
        >
          Already Joined? Log In
        </Text>
      </View>
    </KeyboardAwareScrollView>
  )
}