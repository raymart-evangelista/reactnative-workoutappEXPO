import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { defaultStyles } from "./globalStyles";

export default function SignUpScreen() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={defaultStyles.basic}>
      <Text>Sign Up Screen</Text>
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
      <Button
        title="Sign Up"
      />
    </View>
  )
}