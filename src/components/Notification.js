import { Text, View } from "react-native";

const Notification = ({ message, color }) => {
  if (!message) {
    return null;
  }

  return (
    <View style={{ backgroundColor: color }}>
      <Text style={{ color: "white" }}>{message}</Text>
    </View>
  );
};

export default Notification;
