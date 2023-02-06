import { useState } from "react"
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native"
import { defaultStyles } from "./globalStyles"

export default function LogInScreen({ navigation }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={defaultStyles.basic}>
      <Text>Log In Screen</Text>
      <TextInput
        style={{ borderWidth: 1 }}
        placeholder="Username"
        onChangeText={newUsername => setUsername(newUsername)}
      />
      <TextInput
        style={{ borderWidth: 1 }}
        placeholder="Password"
        onChangeText={newPassword => setPassword(newPassword)}
      />
      <Button 
        title="Don't have an account? Sign up"
        onPress={() => navigation.navigate('SignUpScreen')}
      />
    </View>
  )
}