import {View, ImageBackground } from "react-native"
import { Text } from "react-native-paper"

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
          <Text>Continue with Google</Text>
          <Text>Continue with Facebook</Text>
        </View>
      </ImageBackground>
    </View>
  )
}