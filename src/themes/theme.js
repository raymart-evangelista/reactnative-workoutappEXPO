const lightTheme = {
  roundness: 10,
  colors: {
    primary: 'rgb(0, 122, 255)', // Dynamic Blue (#007AFF)
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(216, 226, 255)',
    onPrimaryContainer: 'rgb(0, 26, 65)',
    secondary: 'rgb(51, 51, 51)', // Sleek Graphite (#333333)
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(188, 233, 255)',
    onSecondaryContainer: 'rgb(0, 31, 42)',
    tertiary: 'rgb(242, 242, 247)', // Neutral Silver (#F2F2F7)
    onTertiary: 'rgb(27, 27, 31)',
    tertiaryContainer: 'rgb(211, 228, 255)',
    onTertiaryContainer: 'rgb(0, 28, 56)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(242, 242, 247)', // Neutral Silver (#F2F2F7)
    onBackground: 'rgb(27, 27, 31)',
    surface: 'rgb(242, 242, 247)', // Neutral Silver (#F2F2F7)
    onSurface: 'rgb(27, 27, 31)',
    surfaceVariant: 'rgb(225, 226, 236)',
    onSurfaceVariant: 'rgb(68, 71, 79)',
    outline: 'rgb(116, 119, 127)',
    outlineVariant: 'rgb(196, 198, 208)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(48, 48, 51)',
    inverseOnSurface: 'rgb(242, 240, 244)',
    inversePrimary: 'rgb(173, 198, 255)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(241, 243, 252)',
      level2: 'rgb(234, 238, 250)',
      level3: 'rgb(226, 233, 248)',
      level4: 'rgb(224, 232, 248)',
      level5: 'rgb(218, 229, 246)',
    },
    surfaceDisabled: 'rgba(27, 27, 31, 0.12)',
    onSurfaceDisabled: 'rgba(27, 27, 31, 0.38)',
    backdrop: 'rgba(46, 48, 56, 0.4)',
  },
}

const darkTheme = {
  roundness: 10,
  colors: {
    primary: 'rgb(0, 122, 255)', // Dynamic Blue (#007AFF)
    onPrimary: 'rgb(255, 255, 255)', // White for contrast on Dynamic Blue
    primaryContainer: 'rgb(0, 68, 147)', // Darker shade of Dynamic Blue
    onPrimaryContainer: 'rgb(216, 226, 255)', // Lighter shade for contrast on darker blue

    secondary: 'rgb(51, 51, 51)', // Sleek Graphite (#333333)
    onSecondary: 'rgb(255, 255, 255)', // White for contrast on Sleek Graphite
    secondaryContainer: 'rgb(0, 77, 99)', // Darker shade of secondary color
    onSecondaryContainer: 'rgb(188, 233, 255)', // Lighter shade for contrast on darker secondary color

    tertiary: 'rgb(242, 242, 247)', // Neutral Silver (#F2F2F7)
    onTertiary: 'rgb(27, 27, 31)', // Dark shade for contrast on Neutral Silver
    tertiaryContainer: 'rgb(0, 72, 128)', // Darker shade of tertiary color
    onTertiaryContainer: 'rgb(211, 228, 255)', // Lighter shade for contrast on darker tertiary color

    error: 'rgb(255, 180, 171)', // Error color
    onError: 'rgb(105, 0, 5)', // Dark shade for contrast on error color
    errorContainer: 'rgb(147, 0, 10)', // Darker shade of error color
    onErrorContainer: 'rgb(255, 180, 171)', // Lighter shade for contrast on darker error color

    background: 'rgb(27, 27, 31)', // Dark background
    onBackground: 'rgb(227, 226, 230)', // Light shade for text on dark background

    surface: 'rgb(27, 27, 31)', // Dark surface
    onSurface: 'rgb(227, 226, 230)', // Light shade for text on dark surface

    surfaceVariant: 'rgb(68, 71, 79)', // Surface variant color
    onSurfaceVariant: 'rgb(196, 198, 208)', // Text on surface variant

    outline: 'rgb(142, 144, 153)', // Outline color
    outlineVariant: 'rgb(68, 71, 79)', // Outline variant color

    shadow: 'rgb(0, 0, 0)', // Shadow color
    scrim: 'rgb(0, 0, 0)', // Scrim color

    inverseSurface: 'rgb(227, 226, 230)', // Inverse surface color
    inverseOnSurface: 'rgb(48, 48, 51)', // Text on inverse surface

    inversePrimary: 'rgb(0, 91, 193)', // Inverse of primary color
    elevation: {
      level0: 'transparent',
      level1: 'rgb(34, 36, 42)',
      level2: 'rgb(39, 41, 49)',
      level3: 'rgb(43, 46, 56)',
      level4: 'rgb(45, 48, 58)',
      level5: 'rgb(47, 51, 62)',
    },
    surfaceDisabled: 'rgba(227, 226, 230, 0.12)',
    onSurfaceDisabled: 'rgba(227, 226, 230, 0.38)',
    backdrop: 'rgba(46, 48, 56, 0.4)',
  },
}

export { lightTheme, darkTheme }
