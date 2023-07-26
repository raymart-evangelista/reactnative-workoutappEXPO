import { Text, View, ScrollView } from 'react-native'
import { defaultStyles } from '../styles/globalStyles';
import { Switch } from 'react-native-paper';
import { useState } from 'react';
import { useColorScheme } from 'nativewind';
import { ThemeContextProvider, useTheme } from '../themes/ThemeContext';
import { Button, Headline } from 'react-native-paper';

export default function SettingsScreen() {

  const { toggleThemeType, themeType, isDarkTheme, theme } = useTheme()
  const getOppositeTheme = () => (themeType === 'light' ? 'dark' : 'light');


  return (
    // <View style={{ backgroundColor: colors.backgroundColor }}>
    <View className="flex-1 justify-center">
      <Text>Settings!</Text>
      {/* button for toggling dark mode */}
      {/* use TailwindCSS */}
     <View>
       <Button mode="contained" onPress={toggleThemeType}>
         Toggle {`${getOppositeTheme()} mode`}
       </Button>
       <Headline>{themeType}</Headline>
       <Headline>isDarkTheme: {`${isDarkTheme}`}</Headline>
       <Headline>Primary: {theme.colors.primary}</Headline>
      </View>
      {/* button for logging out */}
      {/* button for connecting apple watch */}
      {/* button for changing units of measurement */}
    </View>
  )
}