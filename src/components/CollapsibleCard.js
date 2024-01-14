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
    overflow: 'hidden',
    marginVertical: 10,
    backgroundColor: 'blue',
  };

  const gestureTapArea = {
    width: '100%', // Ensure it fills the width
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primaryContainer,
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

  return (
    <PaperCard style={cardStyle} mode={mode}>
      <GestureDetector gesture={tap}>
          <TouchableOpacity style={gestureTapArea} onLongPress={onLongPress} disabled={disabled}>
            <Text style={{ color: theme.colors.onPrimaryContainer }}>{headerContent}</Text>
          </TouchableOpacity>
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
