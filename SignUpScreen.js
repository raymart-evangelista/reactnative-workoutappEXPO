import { useState } from "react";
import { TextInput, View } from "react-native";
import { defaultStyles } from "./globalStyles";

export default function SignUpScreen() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={defaultStyles.basic}>
      <TextInput
        style={{height: 40}}
        placeholder="Username"
        onChangeText={newUsername => setUsername(newUsername)}
      />
      <TextInput
        style={{height: 40}}
        placeholder="Password"
        onChangeText={newPassword => setPassword(newPassword)}
      />
    </View>
  )
}