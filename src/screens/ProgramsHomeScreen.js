import { SafeAreaView } from 'react-native-safe-area-context'
import { useThemedStyles } from '../styles/globalStyles'
import { View } from 'react-native'
import { Button } from 'react-native-paper'

export default function ProgramsHomeScreen({ navigation, route }) {
  const styles = useThemedStyles()

  return (
    <SafeAreaView>
      <View>
        <Button onPress={() => navigation.navigate('MyPrograms')}>
          My Programs
        </Button>
        <Button onPress={() => navigation.navigate('CreateProgram')}>
          Create Program
        </Button>
        {/* <Button>All Programs</Button> */}
      </View>
    </SafeAreaView>
  )
}
