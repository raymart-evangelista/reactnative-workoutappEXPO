import { useContext, useState } from 'react'
import {
  Button,
  Image,
  ImageBackground,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { defaultStyles } from '../styles/globalStyles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios'

import { TextInput as PaperInput } from 'react-native-paper'

import signUpService from '../services/users'
import Notification from '../components/Notification'
import LogInScreen from './LogInScreen'

import loginService from '../services/login'
import { AuthContext } from '../contexts/AuthContext'

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationColor, setNotificationColor] = useState('')

  const { login } = useContext(AuthContext)

  const handleSubmit = async () => {
    if (username === '' || email === '' || password === '') {
      setNotificationMessage('All fields are required')
      setNotificationColor('red')
      return
    }

    try {
      const returnedInfo = await signUpService.signUp(username, email, password)
      console.log(returnedInfo)
      // alert("Sign Up Successful.")
      setNotificationMessage('Signed up successfully')
      setNotificationColor('green')

      const user = await loginService.login({
        username,
        password,
      })

      setNotificationMessage('Logging in')

      login({ user: user.username, email: user.email, token: user.token })

      navigation.replace('Home')
    } catch (error) {
      console.error(error)
      setNotificationMessage('Sign up failed')
      setNotificationColor('red')
      // alert("Something went wrong. Please try again.")
    }
  }

  return (
    <View style={defaultStyles.basic}>
      <Text className="text-center text-6xl">PeakPlanner</Text>
      <Notification message={notificationMessage} color={notificationColor} />
      {/* <Text style={defaultStyles.signupText}>Sign Up</Text> */}
      <View style={{ marginHorizontal: 24 }}>
        <TextInput
          style={defaultStyles.signupInput}
          placeholder="Username"
          onChangeText={(newUsername) => setUsername(newUsername)}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View style={{ marginHorizontal: 24 }}>
        <TextInput
          style={defaultStyles.signupInput}
          placeholder="Email"
          onChangeText={(newEmail) => setEmail(newEmail)}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          keyboardType="email-address"
        />
      </View>
      <View style={{ marginHorizontal: 24 }}>
        <TextInput
          style={defaultStyles.signupInput}
          placeholder="Password"
          onChangeText={(newPassword) => setPassword(newPassword)}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="password"
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity
        onPress={handleSubmit}
        style={defaultStyles.buttonStyle}
      >
        <Text style={defaultStyles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text
        style={{
          color: 'black',
          fontWeight: 'bold',
          fontSize: 12,
          textAlign: 'center',
        }}
        onPress={() => navigation.navigate('LogIn')}
      >
        Already have an account? Log in
      </Text>
    </View>
  )
}
