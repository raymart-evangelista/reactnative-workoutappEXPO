import { useState } from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { defaultStyles } from "../styles/globalStyles"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

import signUpService from '../services/api'

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async () => {
    if (username === '' || email === '' || password === '' ) {
      alert("All fields are required")
      return
    }

    await signUpService.signUp(username, email, password)
    // await axios.post("http://localhost:3000/api/signup", { username, email, password })
    alert("Sign Up Successful")

  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={defaultStyles.basic}>
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
        <Text 
          style={{ color: 'black', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}
          onPress={() => navigation.navigate("LogIn")}
        >
          Already Joined? Log In
        </Text>
      </View>
    </KeyboardAwareScrollView>
  )
}