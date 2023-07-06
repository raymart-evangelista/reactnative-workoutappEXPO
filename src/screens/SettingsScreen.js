import { Text, View } from 'react-native'
import { defaultStyles } from '../styles/globalStyles';
import { Switch, withTheme } from 'react-native-paper';
import { useState } from 'react';

export default function SettingsScreen({ theme }) {

  // const { colors } = theme
  const [isSwitchOn, setIsSwitchOn] = useState(false)
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn)

  return (
    // <View style={{ backgroundColor: colors.backgroundColor }}>
    <View style={defaultStyles.basic}>
      <Text>Settings!</Text>
      {/* button for toggling dark mode */}
      <Switch
        value={isSwitchOn}
        onValueChange={onToggleSwitch}
      />
      {/* button for logging out */}
      {/* button for connecting apple watch */}
      {/* button for changing units of measurement */}
    </View>
  )
}