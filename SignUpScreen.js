import { useState } from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { defaultStyles } from "./globalStyles";

export default function SignUpScreen() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit() {

  }

  return (
    <View style={defaultStyles.basic}>
      <Text style={defaultStyles.signupText}>Sign Up</Text>
      <View style={{ marginHorizontal: 24 }}>
        <TextInput
          style={defaultStyles.signupInput}
          placeholder="Username"
          onChangeText={newUsername => setUsername(newUsername)}
          autoCapitalize={false}
          autoCorrect={false}
        />
      </View>
      <View style={{ marginHorizontal: 24 }}>
        <TextInput
          style={defaultStyles.signupInput}
          placeholder="Email"
          onChangeText={newEmail => setEmail(newEmail)}
          autoCapitalize={false}
          autoCorrect={false}
          autoComplete="email"
          keyboardType="email-address"
        />
      </View>
      <View style={{ marginHorizontal: 24 }}>
        <TextInput
          style={defaultStyles.signupInput}
          placeholder="Password"
          onChangeText={newPassword => setPassword(newPassword)}
          autoCapitalize={false}
          autoCorrect={false}
          autoComplete="password"
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity
        onPress={handleSubmit}
        style={defaultStyles.buttonStyle}
      >
        <Text
          style={defaultStyles.buttonText}
        >
          Submit
        </Text>
      </TouchableOpacity>
      <Text style={{ marginHorizontal: 24 }}>{JSON.stringify({ username, email, password})}</Text>
    </View>
  )
}