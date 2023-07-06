import { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { defaultStyles } from '../styles/globalStyles';
import { useTheme } from 'react-native-paper';

export default function HomeScreen({ navigation, route }) {

  const { width } = Dimensions.get('window')
  const buttonWidth = width * 0.8

  const { colors } = useTheme()

  return (
    <View style={[styles.container, ]}>
      <Button 
        style={[styles.button, { width: buttonWidth }]}
        mode='elevated'
        onPress={() => navigation.navigate('CreateProgram')}
        icon='plus-box-multiple-outline'
      >Create program</Button>
      <Button 
        style={[styles.button, { width: buttonWidth }]}
        mode='elevated'
        onPress={() => navigation.navigate('ExistingPrograms')}
        icon='checkbox-multiple-blank-outline'
      >All programs</Button>
      <Button
        style={[styles.button, { width: buttonWidth }]}
        mode='elevated'
        onPress={() => navigation.navigate('Settings')}
        icon='cog-outline'
      >Settings</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  button: {
    marginVertical: 8,
  },
  buttonContent: {
    height: 48,
  },
  buttonLabel: {
    fontSize: 18,
  },
});