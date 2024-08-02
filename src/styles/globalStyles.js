import { StyleSheet } from 'react-native'
import { useTheme } from '../themes/ThemeContext'

const mainColor = '#000'
const mainTextColor = '#ffffff'
const secondaryColor = '#f9a825'

const defaultStyles = StyleSheet.create({
  basic: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  signupText: {
    fontSize: 30,
    textAlign: 'center',
  },
  signupInput: {
    borderBottomWidth: 0.5,
    height: 48,
    borderBottomColor: '#8e93a1',
    marginBottom: 30,
  },
  buttonStyle: {
    backgroundColor: 'green',
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    marginHorizontal: 15,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  headerFont: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 40,
    textAlign: 'center',
  },
  bodyFont: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
  },
  buttonFont: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
  },
})

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: mainColor,
    marginBottom: 10,
  },
  dashboardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  workoutData: {
    fontSize: 14,
    marginBottom: 10,
  },
  startWorkoutButton: {
    backgroundColor: '#4CAF50',
    color: mainTextColor,
    padding: 10,
    borderRadius: 5,
    marginBottom: 30,
  },
  startWorkoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#ff4d4d',
    color: mainTextColor,
    padding: 10,
    borderRadius: 5,
    marginBottom: 30,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: mainTextColor,
    marginBottom: 10,
  },
  dashboardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    color: mainTextColor,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: mainTextColor,
    marginBottom: 10,
  },
  workoutData: {
    fontSize: 14,
    color: mainTextColor,
    marginBottom: 10,
  },
  startWorkoutButton: {
    backgroundColor: '#4CAF50',
    color: mainTextColor,
    padding: 10,
    borderRadius: 5,
    marginBottom: 30,
  },
  startWorkoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#ff4d4d',
    color: mainTextColor,
    padding: 10,
    borderRadius: 5,
    marginBottom: 30,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

const useThemedStyles = () => {
  const { theme } = useTheme()
  const styles = StyleSheet.create({
    notificationContainer: {
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
    },
    notificationMessage: {
      textAlign: 'center',
      fontSize: 16,
      marginHorizontal: 20,
    },
    validText: {
      color: 'green',
      fontSize: 14,
      // marginTop: 5,
    },
    errorText: {
      color: 'red',
      fontSize: 14,
      // marginTop: 5,
    },
    fabStyle: {
      bottom: 16,
      right: 16,
      position: 'absolute',
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      // width: '20%',
    },
    modalContainerStyle: {
      backgroundColor: theme.colors.background,
      padding: 20,
      margin: 30,
      borderRadius: 15,
    },
    input: {
      flex: 1,
      // width: 75,
      // margin: 4,
      marginVertical: 10,
    },
    switchContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40%',
      // borderWidth: 1,
      // borderColor: 'yellow',
      borderRadius: 15,
    },
    exerciseDataContainer: {
      borderWidth: 1,
      borderColor: '#CCCCCC',
      borderRadius: 15,
      padding: 10,
      marginVertical: 10,
    },
    exerciseDataContainer2: {
      // borderWidth: 1,
      // borderColor: 'blue',
      // borderRadius: 15,
      // padding: 5,
    },
    exerciseDataContainer3: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      // borderWidth: 1,
      // borderColor: 'green',
      borderRadius: 15,
      // padding: 5,
    },
    exerciseNumberInputContainer: {
      flexDirection: 'row',
      flex: 2,
      // borderWidth: 1,
      // borderColor: 'purple',
      // borderRadius: 15,
      // padding: 5,
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    exerciseDataContainer5: {
      // width: '100%',
      // flexDirection: 'row',
      // justifyContent: 'space-evenly',
      // alignContent: 'space-around',
      // alignItems: 'center',
      // borderWidth: 1,
      // borderColor: 'orange',
      borderRadius: 15,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      flex: 1,
    },
    exerciseRangeContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      // borderWidth: 1,
      // borderColor: 'yellow',
      // borderRadius: 15,
    },
    singleTextInput: {
      flex: 1,
      marginVertical: 10,
    },
    rangedTextInput: {
      // width: 70,
      // padding: 5,
      flex: 1,
      marginVertical: 10,
    },
    dash: {
      padding: 10,
    },
    button: {
      marginVertical: 10,
    },
    screenWithOptions: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      // borderWidth: 1,
      // borderColor: 'orange',
    },
    safeArea: {
      flex: 1,
    },
    contentContainer: {
      padding: 16,
    },
    exerciseContainer: {
      marginBottom: 16,
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    descriptionText: {
      fontSize: 16,
      marginBottom: 16,
      fontStyle: 'italic',
    },
    weekCard: {
      marginBottom: 16,
    },
    dayContainer: {
      marginBottom: 16,
    },
    dayText: {
      marginBottom: 16,
      // flexWrap: 'wrap', // Ensures text wraps within the container
      fontWeight: 'bold',
    },
    dayDescription: {
      marginBottom: 16,
      flexWrap: 'wrap', // Ensures text wraps within the container
      fontStyle: 'italic',
    },
    cardTitle: {
      // fontSize: 20,
      fontWeight: 'bold',
      marginTop: 16,
      textAlign: 'center',
    },
    cardSubtitle: {
      fontWeight: '600',
      fontStyle: 'italic',
    },
    divider: {
      marginVertical: 16,
    },
  })

  return styles
}

export { useThemedStyles, defaultStyles, lightStyles, darkStyles }
