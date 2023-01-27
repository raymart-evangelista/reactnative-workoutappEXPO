import { StyleSheet } from "react-native";

const mainColor = '#000';
const mainTextColor = '#ffffff';
const secondaryColor = '#f9a825';

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

export { lightStyles, darkStyles}