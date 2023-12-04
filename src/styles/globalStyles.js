import { StyleSheet } from "react-native";

const mainColor = '#000';
const mainTextColor = '#ffffff';
const secondaryColor = '#f9a825';

const defaultStyles = StyleSheet.create({
  basic: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center'
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
    textAlign: 'center'
  },
  signupInput: {
    borderBottomWidth: 0.5,
    height: 48,
    borderBottomColor: '#8e93a1',
    marginBottom: 30,
  },
  buttonStyle: {
    backgroundColor: "green",
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    marginHorizontal: 15,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  }
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
  }
});
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
  }
});

export { defaultStyles, lightStyles, darkStyles}