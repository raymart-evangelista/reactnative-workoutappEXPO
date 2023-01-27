import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Appearance, StyleSheet, Text, View } from 'react-native';

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
      <StatusBar style="auto" />
    </View>
  );
}
