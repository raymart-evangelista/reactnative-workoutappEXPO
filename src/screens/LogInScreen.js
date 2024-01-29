import { useState, useEffect, useContext } from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { defaultStyles } from "../styles/globalStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import loginService from "../services/login";
import Notification from "../components/Notification";
import { AuthContext } from "../contexts/AuthContext";

export default function LogInScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationColor, setNotificationColor] = useState("");

  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (username === "" || password === "") {
      setNotificationMessage("All fields are required");
      setNotificationColor("red");
      return;
    }

    try {
      setLoading(true);
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);

      setNotificationMessage(`Success. Welcome ${user.username}.`);
      setNotificationColor("green");
      navigation.replace("Home");
      // updates AuthContext

      login({ user: user.username, email: user.email, token: user.token });
    } catch (error) {
      console.error(error);
      setNotificationMessage("Log in failed. Wrong credentials");
      setNotificationColor("red");
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (user) {
  //     navigation.navigate("Home")
  //   }
  // }, [user])

  return (
    <KeyboardAwareScrollView contentContainerStyle={defaultStyles.basic}>
      <View style={defaultStyles.basic}>
        <Text className="text-center text-6xl">PeakPlanner</Text>
        <Notification message={notificationMessage} color={notificationColor} />
        {/* <Text style={defaultStyles.signupText}>Log In</Text> */}
        <View style={{ marginHorizontal: 24 }}>
          <TextInput
            style={defaultStyles.signupInput}
            placeholder="Username"
            onChangeText={(newUsername) => setUsername(newUsername)}
            autoCapitalize={false}
            autoCorrect={false}
          />
        </View>
        <View style={{ marginHorizontal: 24 }}>
          <TextInput
            style={defaultStyles.signupInput}
            placeholder="Password"
            onChangeText={(newPassword) => setPassword(newPassword)}
            autoCapitalize={false}
            autoCorrect={false}
            autoComplete="password"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          onPress={handleLogin}
          style={[defaultStyles.buttonStyle, user !== null && { opacity: 0.5 }]}
          disabled={user !== null}
        >
          {loading ? (
            <Text style={defaultStyles.buttonText}>Loading</Text>
          ) : (
            <Text style={defaultStyles.buttonText}>Log In</Text>
          )}
        </TouchableOpacity>
        <Text
          style={{
            color: "black",
            fontWeight: "bold",
            fontSize: 12,
            textAlign: "center",
          }}
          onPress={() => navigation.navigate("SignUp")}
        >
          Not registered? Sign Up
        </Text>
        <Text style={{ fontSize: 12, textAlign: "center", marginTop: 10 }}>
          Forgot password?
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
}
