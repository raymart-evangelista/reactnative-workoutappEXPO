import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Appearance, StyleSheet, Text, View } from 'react-native';
import { lightStyles, darkStyles } from './globalStyles';
import MainLoggedOut from './MainLoggedOut';

export default function App() {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme())
  const themeStyles = colorScheme === 'dark' ? darkStyles : lightStyles

  useEffect(() => {
    const themeSubscription = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme)
    })

    return () => themeSubscription.remove()
  })

  console.log(colorScheme)

  return (
    <View style={themeStyles.container}>
      <MainLoggedOut />
      <StatusBar style="auto" />
    </View>
  );
}
