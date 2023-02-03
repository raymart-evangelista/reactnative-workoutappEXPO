import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native'
import { defaultStyles } from './globalStyles';

export default function HomeScreen({ navigation, route }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (route.params?.post) {

    }

    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setCount((c) => c + 1)} title="Update count" />
      )
    })
  }, [route.params?.post, navigation])
  return (
    <View style={defaultStyles.basic}>
      {/* <Text>Home Screen</Text> */}
      {/* <Button
        title="Go to Details"
        onPress={() => {
          navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          })
        }}
      /> */}
      <Button 
        title="Create post"
        onPress={() => navigation.navigate('CreatePost')}
      />
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
      <Text>Count: {count}</Text>
    </View>
  )
}