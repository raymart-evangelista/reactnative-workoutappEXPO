import { Text, View } from 'react-native'
import { defaultStyles } from './globalStyles';

export default function WorkoutsScreen() {
  return (
    <View style={defaultStyles.basic}>
      <Text>These are your current workouts</Text>
    </View>
  )
}