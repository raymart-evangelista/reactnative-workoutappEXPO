import { useState } from "react"
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native"
import { defaultStyles } from "./globalStyles"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function LogInScreen({ navigation }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async () => {
    if (username === '' || email === '' || password === '' ) {
      alert("All fields are required")
      return
    }

    await axios.post("http://localhost:8001/api/login", { username, email, password })
    alert("Log In Successful")
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={defaultStyles.basic}>
      <View style={defaultStyles.basic}>
        <Text style={defaultStyles.signupText}>Log In</Text>
        <View style={{ marginHorizontal: 24 }}>
          <TextInput
            style={defaultStyles.signupInput}
            placeholder="Username"
            onChangeText={newUsername => setUsername(newUsername)}
            autoCapitalize={false}
            autoCorrect={false}
          />
        </View>
        {/* <View style={{ marginHorizontal: 24 }}>
          <TextInput
            style={defaultStyles.signupInput}
            placeholder="Email"
            onChangeText={newEmail => setEmail(newEmail)}
            autoCapitalize={false}
            autoCorrect={false}
            autoComplete="email"
            keyboardType="email-address"
          />
        </View> */}
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
        <Text 
          style={{  color: 'black', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}
          onPress={() => navigation.navigate("SignUp")}
        >
          Not registered? Sign Up
        </Text>
        <Text style={{  fontSize: 12, textAlign: 'center', marginTop: 10 }}>
          Forgot password?
        </Text>
      </View>
    </KeyboardAwareScrollView>
  )
}