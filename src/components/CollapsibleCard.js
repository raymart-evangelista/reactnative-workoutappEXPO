import React from 'react';
import { Card as PaperCard } from 'react-native-paper';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../themes/ThemeContext';

import Animated, { useSharedValue, useAnimatedStyle, withTiming, FadeIn } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const CollapsibleCard = ({ headerContent, bodyContent, mode }) => {
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
    // backgroundColor: theme.colors.surface,
    backgroundColor: 'red',
    padding: 10,
  };

  const pressed = useSharedValue(false);
  const tap = Gesture.Tap().onEnd(() => {
    pressed.value = !pressed.value;
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(pressed.value ? 170 : 50, { duration: 200 }),
    };
  });

  return (
    <PaperCard style={cardStyle} mode={mode}>
      <GestureDetector gesture={tap}>
        <Animated.View entering={FadeIn} style={animatedStyle}>
          <TouchableOpacity style={gestureTapArea}>
            <Text style={{ color: theme.colors.onPrimaryContainer }}>{headerContent}</Text>
          </TouchableOpacity>
          <View style={bodyStyle}>
            <Text style={{ color: theme.colors.onSurface }}>{bodyContent}</Text>
          </View>
        </Animated.View>
      </GestureDetector>
    </PaperCard>
  );
};

export default CollapsibleCard;
