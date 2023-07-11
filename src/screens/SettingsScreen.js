import { Text, View, ScrollView } from 'react-native'
import { defaultStyles } from '../styles/globalStyles';
import { Switch } from 'react-native-paper';
import { useState } from 'react';
import { useColorScheme } from 'nativewind';

export default function SettingsScreen() {

  const { colorScheme, toggleColorScheme } = useColorScheme()

  return (
    // <View style={{ backgroundColor: colors.backgroundColor }}>
    <View className="flex-1 justify-center">
      <Text>Settings!</Text>
      {/* button for toggling dark mode */}
      {/* use TailwindCSS */}
      <Switch
        value={colorScheme === 'dark'}
        onChange={toggleColorScheme}
      />
      {/* button for logging out */}
      {/* button for connecting apple watch */}
      {/* button for changing units of measurement */}
    </View>
  )
}