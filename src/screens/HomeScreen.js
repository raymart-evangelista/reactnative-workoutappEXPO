import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native'
// import { Button, Text } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { defaultStyles } from '../styles/globalStyles';

export default function HomeScreen({ navigation, route }) {
  return (
    <View style={styles.container}>
      {/* <Text>Favorite Program stuff will also be on HomeScreen</Text> */}
      <Button 
        mode='elevated'
        onPress={() => navigation.navigate('CreateProgram')}
        icon='plus-box-multiple-outline'
      >Create program</Button>
      <Button 
        mode='elevated'
        onPress={() => navigation.navigate('ExistingPrograms')}
        icon='checkbox-multiple-blank-outline'
      >All programs</Button>
      <Button
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
    width: '200',
    marginVertical: 8,
  },
  buttonContent: {
    height: 48,
  },
  buttonLabel: {
    fontSize: 18,
  },
});