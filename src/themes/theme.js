import { DefaultTheme } from "react-native-paper";

const lightTheme = {
  // roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    // primary: 'tomato',
    // accent: 'yellow',
    primary: '#34DB34',
    accent: '#FF4081',
    background: '#FFFFFF',
    text: '#000000',
  },
  typography: {
    // fontFamily: 'Roboto',
    // fontSize: 16,
  },
  animation: {
    scale: 1.0
  },
  
}

const lightTheme2 = {
  "colors": {
    "primary": "rgb(56, 107, 1)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(183, 244, 129)",
    "onPrimaryContainer": "rgb(13, 32, 0)",
    "secondary": "rgb(87, 98, 74)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(218, 231, 201)",
    "onSecondaryContainer": "rgb(21, 30, 12)",
    "tertiary": "rgb(56, 102, 100)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(187, 236, 233)",
    "onTertiaryContainer": "rgb(0, 32, 31)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "#ceebb2",
    "onBackground": "rgb(26, 28, 24)",
    "surface": "rgb(253, 253, 245)",
    "onSurface": "rgb(26, 28, 24)",
    "surfaceVariant": "rgb(224, 228, 214)",
    "onSurfaceVariant": "rgb(68, 72, 62)",
    "outline": "rgb(116, 121, 109)",
    "outlineVariant": "rgb(196, 200, 186)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(47, 49, 44)",
    "inverseOnSurface": "rgb(241, 241, 234)",
    "inversePrimary": "rgb(156, 215, 105)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(243, 246, 233)",
      "level2": "rgb(237, 241, 226)",
      "level3": "rgb(231, 237, 218)",
      "level4": "rgb(229, 236, 216)",
      "level5": "rgb(225, 233, 211)"
    },
    "surfaceDisabled": "rgba(26, 28, 24, 0.12)",
    "onSurfaceDisabled": "rgba(26, 28, 24, 0.38)",
    "backdrop": "rgba(45, 50, 40, 0.4)"
  }
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

const darkTheme2 = {
  "colors": {
    "primary": "rgb(156, 215, 105)",
    "onPrimary": "rgb(26, 55, 0)",
    "primaryContainer": "rgb(40, 80, 0)",
    "onPrimaryContainer": "rgb(183, 244, 129)",
    "secondary": "rgb(190, 203, 174)",
    "onSecondary": "rgb(41, 52, 31)",
    "secondaryContainer": "rgb(63, 74, 52)",
    "onSecondaryContainer": "rgb(218, 231, 201)",
    "tertiary": "rgb(160, 207, 205)",
    "onTertiary": "rgb(0, 55, 54)",
    "tertiaryContainer": "rgb(30, 78, 77)",
    "onTertiaryContainer": "rgb(187, 236, 233)",
    "error": "rgb(255, 180, 171)",
    "onError": "rgb(105, 0, 5)",
    "errorContainer": "rgb(147, 0, 10)",
    "onErrorContainer": "rgb(255, 180, 171)",
    "background": "rgb(26, 28, 24)",
    "onBackground": "rgb(227, 227, 220)",
    "surface": "rgb(26, 28, 24)",
    "onSurface": "rgb(227, 227, 220)",
    "surfaceVariant": "rgb(68, 72, 62)",
    "onSurfaceVariant": "rgb(196, 200, 186)",
    "outline": "rgb(142, 146, 134)",
    "outlineVariant": "rgb(68, 72, 62)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(227, 227, 220)",
    "inverseOnSurface": "rgb(47, 49, 44)",
    "inversePrimary": "rgb(56, 107, 1)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(33, 37, 28)",
      "level2": "rgb(36, 43, 31)",
      "level3": "rgb(40, 49, 33)",
      "level4": "rgb(42, 50, 34)",
      "level5": "rgb(44, 54, 35)"
    },
    "surfaceDisabled": "rgba(227, 227, 220, 0.12)",
    "onSurfaceDisabled": "rgba(227, 227, 220, 0.38)",
    "backdrop": "rgba(45, 50, 40, 0.4)"
  }
}

export { lightTheme, lightTheme2, darkTheme, darkTheme2 }