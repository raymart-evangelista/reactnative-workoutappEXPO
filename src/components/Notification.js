import { View } from "react-native"

const Notification = ({ message }) => {
  if (!message) {
    return null
  }

  return (
    <View style={{ backgroundColor: 'red' }}>
      <Text style={{ color: 'white' }}>{message}</Text>
    </View>
  )
}

export default Notification