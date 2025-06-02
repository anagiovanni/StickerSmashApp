import React, { useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, runOnJS } from 'react-native-reanimated';
import { type ImageSource } from "expo-image";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

type Props = {
  imageSize: number;
  source: ImageSource;
  x: number;
  y: number;
  onDrag: (newX: number, newY: number) => void;
}

export default function MovableEmojiSticker({ imageSize, source, x, y, onDrag }: Props) {
  // Use shared values initialized with props x and y
  const translateX = useSharedValue(x);
  const translateY = useSharedValue(y);
  const scaleImage = useSharedValue(imageSize);

  // Sync shared values when props change (optional)
  useEffect(() => {
    translateX.value = x;
    translateY.value = y;
  }, [x, y]);

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2;
      } else {
        scaleImage.value = Math.round(scaleImage.value / 2);
      }
    });

  const drag = Gesture.Pan()
    .onUpdate(event => {
      translateX.value = event.translationX + x;
      translateY.value = event.translationY + y;
    })
    .onEnd(() => {
      // Quando o gesto termina, atualize o estado no componente pai
      runOnJS(onDrag)(translateX.value, translateY.value);
    });

  const composedGesture = Gesture.Race(drag, doubleTap);

  const animatedStyle = useAnimatedStyle(() => ({
    width: withSpring(scaleImage.value),
    height: withSpring(scaleImage.value),
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value }
    ]
  }));

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.Image
        source={source}
        resizeMode='contain'
        style={animatedStyle}
      />
    </GestureDetector>
  );
}
