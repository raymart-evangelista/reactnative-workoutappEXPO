import { View } from 'react-native'
import { Text, TextInput } from 'react-native-paper'
import { useThemedStyles } from '../styles/globalStyles'

export default function Notification({ message, type }) {
  if (!message) return null
  const styles = useThemedStyles()
  const backgroundColor =
    type === 'error' ? '#FFCCCC' : type === 'success' ? '#CCFFCC' : '#FFFF99'
  const textColor =
    type === 'error' ? '#CC0000' : type === 'success' ? '#006600' : '#666600'
  return (
    <View style={[styles.notificationContainer, { backgroundColor }]}>
      <Text style={styles.notificationMessage}>{message}</Text>
    </View>
  )
}
