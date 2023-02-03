import React from "react";
import { View, Text, TouchableOpacity } from 'react-native'
import { defaultStyles } from "./globalStyles";

export default function MainLoggedOut() {
  return (
    <View style={defaultStyles.basic}>
      <TouchableOpacity

      >
        <Text>Create an account</Text>
      </TouchableOpacity>
    </View>
  )
}