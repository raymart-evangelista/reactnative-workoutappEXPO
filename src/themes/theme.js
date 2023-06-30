import { DefaultTheme } from "react-native-paper";

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // primary: 'tomato',
    // accent: 'yellow',
  },
  animation: {
    scale: 1.0
  },
}

const darkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // modify color palette for dark theme
    primary: 'purple',
    background: 'black',
  }
}

export { lightTheme, darkTheme }