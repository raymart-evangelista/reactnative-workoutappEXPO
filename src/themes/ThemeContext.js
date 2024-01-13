import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useColorScheme } from "react-native";

import { lightTheme, darkTheme } from "./theme";

import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper'

import {
  NavigationContainer,
  Theme as NavigationTheme,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native'

// const lightTheme = {
//   ...NavigationDefaultTheme,
//   ...PaperDefaultTheme,
//   colors: {
//     ...NavigationDefaultTheme.colors,
//     ...PaperDefaultTheme.colors,
//   }
// }

// const darkTheme = {
//   ...NavigationDarkTheme,
//   ...darkTheme,
//   colors: {
//     ...NavigationDarkTheme.colors,
//     ...darkTheme.colors,
//   }
// }

export const ThemeContext = createContext({
  theme: lightTheme,
  themeType: 'light',
  isDarkTheme: false,
  setThemeType: () => {},
  toggleThemeType: () => {},
})

export const useTheme = () => useContext(ThemeContext)

export const ThemeContextProvider = ({ children }) => {
  const colorScheme = useColorScheme()
  const [themeType, setThemeType] = useState(colorScheme === 'dark' ? 'dark' : 'light')

  const toggleThemeType = useCallback(() => {
    setThemeType(prev => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  const isDarkTheme = useMemo(() => themeType === 'dark', [themeType])
  const theme = useMemo(() => (isDarkTheme ? darkTheme : lightTheme), [isDarkTheme])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeType,
        isDarkTheme,
        setThemeType,
        toggleThemeType,
      }}
    >
      <NavigationContainer theme={theme}>
        <PaperProvider theme={theme}>
          {children}
        </PaperProvider>
      </NavigationContainer>
    </ThemeContext.Provider>
  )
}