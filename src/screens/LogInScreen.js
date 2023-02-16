import { useState } from "react"
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native"
import { defaultStyles } from "../styles/globalStyles"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Notification from "../components/Notification";

export default function LogInScreen({ navigation }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationColor, setNotificationColor] = useState('')

  const handleSubmit = async () => {
    if (username === '' || password === '' ) {
      setNotificationMessage('All fields are required')
      setNotificationColor('red')
      return
    }

    try {
      console.log('logging in with', username, password)

      setNotificationMessage('Success')
      setNotificationColor('green')

    } catch (error) {
      console.error(error)

      setNotificationMessage('Log in failed')
      setNotificationColor('red')
    }

    // await axios.post("http://localhost:8001/api/login", { username, email, password })
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={defaultStyles.basic}>
      <View style={defaultStyles.basic}>
        <Notification message={notificationMessage} color={notificationColor} />
        <Text style={defaultStyles.signupText}>Log In</Text>
        <View style={{ marginHorizontal: 24 }}>
          <TextInput
            style={defaultStyles.signupInput}
            placeholder="Username"
            onChangeText={newUsername => setUsername(newUsername)}
            autoCapitalize={false}
            autoCorrect={false}
          />
        </View>
        {/* <View style={{ marginHorizontal: 24 }}>
          <TextInput
            style={defaultStyles.signupInput}
            placeholder="Email"
            onChangeText={newEmail => setEmail(newEmail)}
            autoCapitalize={false}
            autoCorrect={false}
            autoComplete="email"
            keyboardType="email-address"
          />
        </View> */}
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
          style={{  color: 'black', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}
          onPress={() => navigation.navigate("SignUp")}
        >
          Not registered? Sign Up
        </Text>
        <Text style={{  fontSize: 12, textAlign: 'center', marginTop: 10 }}>
          Forgot password?
        </Text>
      </View>
    </KeyboardAwareScrollView>
  )
}