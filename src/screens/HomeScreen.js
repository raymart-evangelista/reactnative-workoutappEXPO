import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native'
import { defaultStyles } from '../styles/globalStyles';

export default function HomeScreen({ navigation, route }) {
  return (
    <View style={defaultStyles.basic}>
      {/* <Text>Favorite Program stuff will also be on HomeScreen</Text> */}
      <Button 
        title="Create program"
        onPress={() => navigation.navigate('CreateProgram')}
        />
      <Button 
        title="All programs"
        onPress={() => navigation.navigate('ExistingPrograms')}
      />
      <Button
        title="Settings"
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  )
}