import { View, ScrollView } from 'react-native'
import { defaultStyles } from '../styles/globalStyles'
import { Text, Switch } from 'react-native-paper'
import { useContext, useState } from 'react'
import { useColorScheme } from 'nativewind'
import { ThemeContextProvider, useTheme } from '../themes/ThemeContext'
import { Button, Headline } from 'react-native-paper'

import { useDispatch } from 'react-redux'
import { logout } from '../features/authSlice'

export default function SettingsScreen({ navigation }) {
  const { toggleThemeType, themeType, isDarkTheme, theme } = useTheme()
  const getOppositeTheme = () => (themeType === 'light' ? 'dark' : 'light')

  const iconType = theme.dark ? 'white-balance-sunny' : 'moon-waxing-crescent'

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <View className="flex-1 justify-center items-center">
      {/* <Text>Settings!</Text> */}
      <View>
        <Button
          className="w-min"
          mode="contained"
          onPress={toggleThemeType}
          icon={iconType}
          contentStyle={{ flexDirection: 'row-reverse' }}
        >
          {`${getOppositeTheme()}`}
        </Button>
        <Button mode="contained" onPress={handleLogout}>
          Logout
        </Button>
        {/* <Button
          mode="contained"
          icon={iconType}
          contentStyle={{flexDirection: 'row-reverse'}}
        >
          Next
        </Button> */}
        {/* <Headline>{themeType}</Headline> */}
        {/* <Headline>isDarkTheme: {`${isDarkTheme}`}</Headline> */}
        {/* <Headline>Primary: {theme.colors.primary}</Headline> */}
      </View>
      {/* button for logging out */}
      {/* button for connecting apple watch */}
      {/* button for changing units of measurement */}
    </View>
  )
}
