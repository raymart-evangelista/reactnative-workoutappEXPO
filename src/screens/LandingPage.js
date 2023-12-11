import {View, ImageBackground } from "react-native"
import { Button, Text } from "react-native-paper"

export default function LandingPage({ navigation, route }) {
  return (
    <View className="flex-1">
      <ImageBackground 
        source={require('../images/landing-image.png')}
        className="flex-1	justify-center"
      >
        <Text className="text-center text-6xl">PeakPlanner</Text>
        {/* auth sign in buttons, use google or apple id */}
        <View className="flex-row justify-evenly">
          <Button mode="elevated" onPress={() => navigation.navigate('LogIn')}>Log In</Button>
          <Button mode="elevated" onPress={() => navigation.navigate('SignUp')}>Sign Up</Button>
        </View>
      </ImageBackground>
    </View>
  )
}