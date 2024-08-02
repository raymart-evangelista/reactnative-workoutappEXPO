import { useContext, useState, useRef, useEffect } from 'react'
import { defaultStyles } from '../styles/globalStyles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios'

import {
  Button,
  TextInput as PaperInput,
  Text,
  TextInput,
} from 'react-native-paper'

import Notification from '../components/Notification'

import signUpService from '../services/users'
import LogInScreen from './LogInScreen'

import loginService from '../services/login'

import { useForm, Controller } from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useThemedStyles } from '../styles/globalStyles'
import { View } from 'react-native'
import { useDispatch } from 'react-redux'
import { login } from '../features/authSlice'

export default function SignUpScreen({ navigation }) {
  const styles = useThemedStyles()
  const emailInputRef = useRef(null)
  const passwordInputRef = useRef(null)

  const [loading, setLoading] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationType, setNotificationType] = useState('')

  const onSignupSubmit = async ({ username, email, password }) => {
    try {
      setLoading(true)
      const returnedInfo = await signUpService.signUp({
        username,
        email,
        password,
      })
      console.log(returnedInfo)
      // alert("Sign Up Successful.")
      setNotificationMessage('Signed up successfully')
      setNotificationType('success')

      const user = await loginService.login({
        username,
        password,
      })

      dispatch(
        login({ username: user.username, email: user.email, token: user.token })
      )

      navigation.reset({
        index: 0,
        routes: [{ name: 'TabNavigator', params: { screen: 'Home' } }],
      })
    } catch (error) {
      setNotificationMessage(error.message)
      setNotificationType('error')
    } finally {
      setLoading(false)
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
      <Notification message={notificationMessage} type={notificationType} />
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
              onSubmitEditing={() => emailInputRef.current?.focus()}
            />
          </View>
        )}
      />
      {errors.username && (
        <Text style={styles.errorText}>{errors.username.message}</Text>
      )}
      <Controller
        control={control}
        name="email"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <View style={styles.inputContainer}>
            <TextInput
              ref={emailInputRef}
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
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />
          </View>
        )}
      />
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}
      <Controller
        control={control}
        name="password"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <View style={styles.inputContainer}>
            <TextInput
              ref={passwordInputRef}
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
              onSubmitEditing={handleSubmit(onSignupSubmit)}
            />
          </View>
        )}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}
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
