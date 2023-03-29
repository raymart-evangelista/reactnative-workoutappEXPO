import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native'
import { defaultStyles } from '../styles/globalStyles';

export default function HomeScreen({ navigation, route }) {
  return (
    <View style={defaultStyles.basic}>
      <Button 
        title="Create program"
        onPress={() => navigation.navigate('CreateProgram')}
      />
      <Button 
        title="Edit existing program"
        onPress={() => navigation.navigate('ExistingPrograms')}
      />
      <Button 
        title="Continue program"
      />
    </View>
  )
}