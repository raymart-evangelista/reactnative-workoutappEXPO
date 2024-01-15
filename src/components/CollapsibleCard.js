import React from 'react';
import { Card as PaperCard } from 'react-native-paper';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../themes/ThemeContext';

import Animated, { useSharedValue, useAnimatedStyle, withTiming, FadeIn } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const CollapsibleCard = ({ headerContent, children, mode, onLongPress, disabled }) => {
  const { theme } = useTheme();

  const cardStyle = {
    width: '90%',
    alignSelf: 'center',
    borderRadius: theme.roundness,
    // overflow: 'hidden',
    marginVertical: 10,
  };

  const gestureTapArea = {
    width: '100%', // Ensure it fills the width
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primaryContainer,
    borderTopRightRadius: theme.roundness,
    borderTopLeftRadius: theme.roundness,
    borderBottomRightRadius: theme.roundness,
    borderBottomLeftRadius: theme.roundness,
  };

  const bodyStyle = {
    backgroundColor: theme.colors.surface,
    // backgroundColor: 'red',
    padding: 10,
  };

  const pressed = useSharedValue(false);
  const tap = Gesture.Tap().onEnd(() => {
    pressed.value = !pressed.value;
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(pressed.value ? 200 : 0, { duration: 200 }),
    };
  });

  const animatedGestureTapAreaStyle = useAnimatedStyle(() => {
    return {
      borderBottomLeftRadius: withTiming(pressed.value ? 0 : theme.roundness, { duration: 200 }),
      borderBottomRightRadius: withTiming(pressed.value ? 0 : theme.roundness, { duration: 200 }),
    }
  })

  return (
    <PaperCard style={cardStyle} mode='elevated'>
      <GestureDetector gesture={tap}>
          <Animated.View style={[gestureTapArea, animatedGestureTapAreaStyle]}>
            <TouchableOpacity 
              // style={gestureTapArea} 
              onLongPress={onLongPress} 
              disabled={disabled}
            >
              <Text style={{ color: theme.colors.onPrimaryContainer }}>{headerContent}</Text>
            </TouchableOpacity>
          </Animated.View>
      </GestureDetector>
      <Animated.View entering={FadeIn} style={animatedStyle}>
          <View>
            {children}
          </View>
      </Animated.View>
    </PaperCard>
  );
};

export default CollapsibleCard;
