import { useContext, useState } from 'react'
import { defaultStyles } from '../styles/globalStyles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios'

import {
  Button,
  TextInput as PaperInput,
  Text,
  TextInput,
} from 'react-native-paper'

import signUpService from '../services/users'
import Notification from '../components/Notification'
import LogInScreen from './LogInScreen'

import loginService from '../services/login'
import { AuthContext } from '../contexts/AuthContext'

import { useForm, Controller } from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useThemedStyles } from '../styles/globalStyles'
import { View } from 'react-native'

export default function SignUpScreen({ navigation }) {
  const styles = useThemedStyles()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationColor, setNotificationColor] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useContext(AuthContext)

  const onSignupSubmit = async () => {
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

  const signupSchema = yup.object({
    username: yup.string().required('* Username is required'),
    email: yup
      .string()
      .email('* Please enter a valid email address')
      .required('* Email address is required'),
    password: yup.string().required('* Password is required'),
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
    mode: 'onSubmit',
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })
  return (
    <SafeAreaView style={styles.screenWithOptions}>
      <Text className="text-center text-6xl">PeakPlanner</Text>
      <Text style={defaultStyles.signupText}>Sign Up</Text>
      <Notification message={notificationMessage} color={notificationColor} />
      <Controller
        control={control}
        name="username"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <View style={styles.inputContainer}>
            <TextInput
              label="Username"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value || ''}
              error={!!error}
              mode="outlined"
              autoCapitalize="none"
              style={styles.input}
              returnKeyType="next"
            />
          </View>
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <View style={styles.inputContainer}>
            <TextInput
              label="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value || ''}
              error={!!error}
              mode="outlined"
              autoCapitalize="none"
              style={styles.input}
              returnKeyType="next"
              autoComplete="email"
              keyboardType="email-address"
            />
          </View>
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <View style={styles.inputContainer}>
            <TextInput
              label="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value || ''}
              error={!!error}
              mode="outlined"
              autoCapitalize="none"
              style={styles.input}
              returnKeyType="go"
              autoComplete="password-new"
              secureTextEntry
            />
          </View>
        )}
      />
      <Button
        mode="contained"
        style={styles.button}
        onPress={handleSubmit(onSignupSubmit)}
        disabled={loading}
        loading={loading}
      >
        {loading ? 'Loading...' : 'Log In'}
      </Button>
      <View style={defaultStyles.basic}>
        {/* <TouchableOpacity
          onPress={handleSubmit}
          style={defaultStyles.buttonStyle}
        >
          <Text style={defaultStyles.buttonText}>Sign Up</Text>
        </TouchableOpacity> */}
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
    </SafeAreaView>
  )
}
