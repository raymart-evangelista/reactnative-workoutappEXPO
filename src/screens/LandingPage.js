import { View, ImageBackground } from 'react-native'
import { Button, Text } from 'react-native-paper'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'

import { ScrollView } from 'react-native-gesture-handler'

WebBrowser.maybeCompleteAuthSession()

import Constants from 'expo-constants'

export default function LandingPage({ navigation, route }) {
  const [userInfo, setUserInfo] = useState(null)
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: Constants.expoConfig.extra.GOOGLE_ANDROID_ID,
    iosClientId: Constants.expoConfig.extra.GOOGLE_IOS_ID,
    webClientId: Constants.expoConfig.extra.GOOGLE_WEB_ID,
  })

  useEffect(() => {
    if (response?.type === 'success') {
      handleSignInWithGoogle(response.authentication.accessToken)
      navigation.navigate('TabNavigator')
    }
  }, [response])

  const handleSignInWithGoogle = async (token) => {
    if (!token) return
    try {
      const user = await getUserInfo(token)
      setUserInfo(user)
      await AsyncStorage.setItem('@user', JSON.stringify(user))
    } catch (error) {
      console.error('Failed to sign in with Google:', error)
    }
  }

  const getUserInfo = async (token) => {
    const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.json()
  }

  return (
    <View className="flex-1">
      <ImageBackground
        source={require('../images/landing-image.png')}
        className="flex-1	justify-center"
      >
        <ScrollView>
          <Text className="text-center text-6xl">PeakPlanner</Text>
          {/* auth sign in buttons, use google or apple id */}
          <Text className="text-center text-6xl">
            {JSON.stringify(userInfo, null, 2)}
          </Text>
          <View className="flex-row justify-evenly">
            <Button
              mode="elevated"
              onPress={() => navigation.navigate('LogIn')}
            >
              Log In
            </Button>
            <Button
              mode="elevated"
              onPress={() => navigation.navigate('SignUp')}
            >
              Sign Up
            </Button>
            <Button mode="elevated" onPress={() => promptAsync()}>
              Sign in with Google
            </Button>
            <Button
              mode="elevated"
              onPress={async () => {
                await AsyncStorage.removeItem('@user')
                setUserInfo(null)
              }}
            >
              Delete local storage
            </Button>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  )
}
