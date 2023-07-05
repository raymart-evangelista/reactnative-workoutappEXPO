import { Text, View } from 'react-native'
import { defaultStyles } from '../styles/globalStyles';
import { Switch } from 'react-native-paper';

export default function SettingsScreen() {
  return (
    <View style={defaultStyles.basic}>
      <Text>Settings!</Text>
      {/* button for toggling dark mode */}
      <Switch></Switch>
      {/* button for logging out */}
      {/* button for connecting apple watch */}
      {/* button for changing units of measurement */}
    </View>
  )
}