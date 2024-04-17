import { useState, useEffect, useContext, useRef } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { defaultStyles, useThemedStyles } from '../styles/globalStyles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import loginService from '../services/login'
import Notification from '../components/Notification'
import { AuthContext } from '../contexts/AuthContext'

import { useForm, Controller } from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
const loginSchema = yup.object({
  username: yup.string().required('* Username is required'),
  password: yup.string().required('* Password is required'),
})

export default function LogInScreen({ navigation }) {
  const styles = useThemedStyles()
  const passwordInputRef = useRef(null)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onSubmit',
    defaultValues: {
      username: '',
      password: '',
    },
  })
  const [loading, setLoading] = useState(false)

  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationColor, setNotificationColor] = useState('')

  const { login } = useContext(AuthContext)

  const onLoginSubmit = async ({ username, password }) => {
    try {
      setLoading(true)
      const user = await loginService.login({
        username,
        password,
      })
      setNotificationMessage(`Success. Welcome ${user.username}.`)
      setNotificationColor('green')
      navigation.reset({
        index: 0,
        routes: [{ name: 'TabNavigator', params: { screen: 'Home' } }],
      })
      login({ user: user.username, email: user.email, token: user.token })
    } catch (error) {
      console.error(error)
      setNotificationMessage(error.message)
      setNotificationColor('red')
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView
      className="border-2 border-red-500"
      // contentContainerStyle={defaultStyles.basic}
      style={styles.screenWithOptions}
    >
      <Text className="text-center text-6xl">PeakPlanner</Text>
      <Text style={defaultStyles.signupText}>Log In</Text>
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
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />
          </View>
        )}
      />
      {errors.username && (
        <Text style={styles.errorText}>{errors.username.message}</Text>
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
              secureTextEntry
              returnKeyType="go"
              onSubmitEditing={handleSubmit(onLoginSubmit)}
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
        onPress={handleSubmit(onLoginSubmit)}
        disabled={loading}
        loading={loading}
      >
        {loading ? 'Loading...' : 'Log In'}
      </Button>
      <View style={defaultStyles.basic}>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 12,
            textAlign: 'center',
          }}
          onPress={() => navigation.navigate('SignUp')}
        >
          Not registered? Sign Up
        </Text>
        <Text style={{ fontSize: 12, textAlign: 'center', marginTop: 10 }}>
          Forgot password?
        </Text>
      </View>
    </SafeAreaView>
  )
}
