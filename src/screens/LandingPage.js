import {View, ImageBackground } from "react-native"
import { defaultStyles } from "../styles/globalStyles"
import { Text } from "react-native-paper"

export default function LandingPage({ navigation, route }) {
  return (
    <View style={defaultStyles.container}>
      <ImageBackground 
        source={require('../images/landing-image.png')}
        style={defaultStyles.backgroundImage}
      >
        <Text style={defaultStyles.headerFont}>PeakPlanner</Text>
        <Text className="text-center text-6xl">PeakPlanner</Text>
        {/* auth sign in buttons, use google or apple id */}
      </ImageBackground>
    </View>
  )
}