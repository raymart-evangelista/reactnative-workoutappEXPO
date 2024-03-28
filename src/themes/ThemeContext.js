import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import { Appearance, useColorScheme } from 'react-native'
import { lightTheme, darkTheme } from './theme'
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  MD3DarkTheme as PaperDarkTheme,
} from 'react-native-paper'
import {
  NavigationContainer,
  Theme as NavigationTheme,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native'

const customLightTheme = {
  ...PaperDefaultTheme,
  ...lightTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...lightTheme.colors,
  },
}

const customDarkTheme = {
  ...PaperDarkTheme,
  ...darkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...darkTheme.colors,
  },
}

export const ThemeContext = createContext({
  theme: customLightTheme,
  themeType: 'light',
  isDarkTheme: false,
  setThemeType: () => {},
  toggleThemeType: () => {},
})

export const useTheme = () => useContext(ThemeContext)

export const ThemeContextProvider = ({ children }) => {
  const colorScheme = useColorScheme()
  const isDarkTheme = colorScheme === 'dark'
  const theme = useMemo(
    () => (isDarkTheme ? darkTheme : lightTheme),
    [isDarkTheme]
  )
  // const [themeType, setThemeType] = useState(
  //   colorScheme === 'dark' ? 'dark' : 'light'
  // )

  // const toggleThemeType = useCallback(() => {
  //   setThemeType((prev) => (prev === 'dark' ? 'light' : 'dark'))
  //   console.log(`the colorScheme is: ${colorScheme}`)
  //   console.log(Appearance.getColorScheme())
  // }, [])

  // const isDarkTheme = useMemo(() => themeType === 'dark', [themeType])
  // const theme = useMemo(
  //   () => (isDarkTheme ? darkTheme : lightTheme),
  //   [isDarkTheme]
  // )

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDarkTheme,
        // themeType,
        // isDarkTheme,
        // setThemeType,
        // toggleThemeType,
      }}
    >
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  )
}
