import React, { useState } from 'react';
import { Card as PaperCard } from 'react-native-paper';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../themes/ThemeContext';

import Animated, { useSharedValue, useAnimatedStyle, withTiming, FadeIn } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const CollapsibleCard = ({ headerContent, children, mode, onLongPress, disabled }) => {
  const { theme } = useTheme();

  const estimatedHeightPerChildren = 150
  const listChild = React.Children.toArray(children).find(child =>
    child.$$typeof === Symbol.for('react.element') && child.props.data)
  const dataLength = listChild?.props.data.length
  const totalHeight = dataLength * estimatedHeightPerChildren

  const cardStyle = {
    borderRadius: theme.roundness,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
  };
  
  const cardContainerStyle = {
    overflow: 'hidden',

  }

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

  const pressed = useSharedValue(false);
  const tap = Gesture.Tap().onEnd(() => {
    pressed.value = !pressed.value;
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(pressed.value ? totalHeight : 0, { duration: 200 }),
    };
  });

  const animatedGestureTapAreaStyle = useAnimatedStyle(() => {
    return {
      borderBottomLeftRadius: withTiming(pressed.value ? 0 : theme.roundness, { duration: 200 }),
      borderBottomRightRadius: withTiming(pressed.value ? 0 : theme.roundness, { duration: 200 }),
    }
  })

  return (
    <View style={cardContainerStyle}>
      <PaperCard style={cardStyle} mode='elevated'>
        <GestureDetector gesture={tap}>
          <TouchableOpacity 
            onLongPress={onLongPress} 
            disabled={disabled}
          >
            <Animated.View 
              style={[gestureTapArea, animatedGestureTapAreaStyle]}
              onLongPress={onLongPress}
            >
                <Text style={{ color: theme.colors.onPrimaryContainer }}>{headerContent}</Text>
            </Animated.View>
          </TouchableOpacity>
        </GestureDetector>
        <Animated.View 
          entering={FadeIn}
          style={animatedStyle}
        >
            <View>
              {children}
            </View>
        </Animated.View>
      </PaperCard>
    </View>
  );
};

export default CollapsibleCard;
