import { useEffect, useState } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { useThemedStyles } from '../styles/globalStyles'
import MyProgramsScreen from './MyProgramsScreen'

export default function HomeScreen({ navigation, route }) {
  const styles = useThemedStyles()
  const { width } = Dimensions.get('window')
  const buttonWidth = width * 0.8

  return (
    <View style={styles.screenWithOptions}>
      <Button
        style={[styles.button, { width: buttonWidth }]}
        mode="outlined"
        onPress={() => navigation.navigate('Programs')}
        icon="plus-box-multiple-outline"
      >
        Create program
      </Button>
      <Button
        style={[styles.button, { width: buttonWidth }]}
        mode="outlined"
        onPress={() => navigation.navigate('MyPrograms')}
        icon="text-box-check-outline"
      >
        My programs
      </Button>
      <Button
        style={[styles.button, { width: buttonWidth }]}
        mode="outlined"
        onPress={() => navigation.navigate('ExistingPrograms')}
        icon="checkbox-multiple-blank-outline"
      >
        All programs
      </Button>
      <Button
        style={[styles.button, { width: buttonWidth }]}
        mode="outlined"
        onPress={() => navigation.navigate('Settings')}
        icon="cog-outline"
      >
        Settings
      </Button>
    </View>
  )
}
