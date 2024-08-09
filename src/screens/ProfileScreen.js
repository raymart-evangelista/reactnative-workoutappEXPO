import { View, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { useThemedStyles } from '../styles/globalStyles'

export default function ProfileScreen({ navigation }) {
  const user = useSelector((state) => state.user.user)
  const styles = useThemedStyles()

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.contentContainer}>
        <Text>Hello</Text>
        {user && <Text>{user.id}</Text>}
      </ScrollView>
    </SafeAreaView>
  )
}
