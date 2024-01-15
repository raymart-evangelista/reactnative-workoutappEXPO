import { useState } from 'react'
import {
  StyleProp,
  ViewStyle,
  Animated,
  StyleSheet,
  Platform,
  ScrollView,
  Text,
  View,
  SafeAreaView,
  I18nManager,
} from 'react-native'
import { AnimatedFAB as AniFAB } from 'react-native-paper'

const AnimatedFAB = ({
  animatedValue,
  visible,
  extended,
  label,
  animateFrom,
  style,
  iconMode,
  onPress,
  children
}) => {
  const [isExtended, setIsExtended] = useState(false)
  const isIOS = Platform.OS === 'ios'

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0
    setIsExtended(currentScrollPosition <= 0)
  }

  const fabStyle = { [animateFrom]: 32 }

  return (
    <View className="flex-1 border-2 border-green-500">
      <AniFAB
        icon={'plus'}
        label={'Add Week'}
        extended={isExtended}
        onPress={onPress}
        visible={visible}
        animateFrom={'right'}
        iconMode={'dynamic'}
        style={[styles.fabStyle, style, fabStyle]}
      />
    </View>
  )
}

export default AnimatedFAB

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  fabStyle: {
    bottom: 32,
    right: 32,
    position: 'absolute'
  }
})