import { View, ImageBackground } from 'react-native'
import { Button, Text } from 'react-native-paper'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'

import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

WebBrowser.maybeCompleteAuthSession()

import Constants from 'expo-constants'
import { useThemedStyles } from '../styles/globalStyles'

import { useRealm } from '@realm/react'
import { BSON } from 'realm'

import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../features/userSlice'
import { generateUniqueId } from '../utils/idGenerator'
import { setAuthenticated, signInWithGoogle } from '../features/authSlice'

export default function LandingPage({ navigation, route }) {
  const styles = useThemedStyles()
  const [userInfo, setUserInfo] = useState(null)
  const dispatch = useDispatch()
  const realm = useRealm()
  const authStatus = useSelector((state) => state.auth.status)

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: Constants.expoConfig.extra.GOOGLE_ANDROID_ID,
    iosClientId: Constants.expoConfig.extra.GOOGLE_IOS_ID,
    webClientId: Constants.expoConfig.extra.GOOGLE_WEB_ID,
  })

  useEffect(() => {
    if (response?.type === 'success') {
      handleSignInWithGoogle(response.authentication.accessToken)
    }
  }, [response])

  const handleSignInWithGoogle = async (token) => {
    if (!token) return
    try {
      user = await dispatch(signInWithGoogle(token)).unwrap()
      console.log(user)
      setUserInfo(user)
    } catch (error) {
      console.error('Failed to sign in with Google:', error)
      console.error('Error stack:', error.stack)
    }
  }

  return (
    <ImageBackground
      source={require('../images/landing-image.png')}
      className="flex-1"
    >
      <SafeAreaView style={styles.screenWithOptions}>
        <Text className="text-center text-6xl">PeakPlanner</Text>
        {/* auth sign in buttons, use google or apple id */}
        <Text className="text-center text-6xl">
          {JSON.stringify(authStatus, null, 2)}
        </Text>
        <View className="flex-column justify-evenly">
          <Button
            style={[styles.button]}
            mode="elevated"
            onPress={() => navigation.navigate('LogIn')}
          >
            Log In
          </Button>
          <Button
            style={[styles.button]}
            mode="elevated"
            onPress={() => navigation.navigate('SignUp')}
          >
            Sign Up
          </Button>
          <Button
            style={[styles.button]}
            mode="elevated"
            onPress={() => promptAsync()}
          >
            Sign in with Google
          </Button>
          <Button
            style={[styles.button]}
            mode="elevated"
            onPress={async () => {
              await AsyncStorage.removeItem('@user')
              setUserInfo(null)
            }}
          >
            Delete local storage
          </Button>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}
