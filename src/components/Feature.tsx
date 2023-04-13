import React from 'react';
import { HStack, VStack, Pressable } from 'native-base';
import { Typography } from './Typography';
import { IonIcon } from './IonIcon';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface Props {
  iconName: string;
  title: string;
  caption: string;
  onPress?: () => void;
}

const AnimatedHStack = Animated.createAnimatedComponent(HStack);

export const Feature = ({ iconName, title, caption, onPress }: Props) => {
  const progress = useSharedValue(0);

  const style = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          progress.value,
          [0, 1],
          [1, 0.92],
          Extrapolate.CLAMP,
        ),
      },
    ],
    opacity: interpolate(progress.value, [0, 1], [1, 0.8]),
  }));

  return (
    <Pressable
      flex={1}
      onPress={onPress}
      onPressIn={() => {
        progress.value = withTiming(1, {
          easing: Easing.linear,
          duration: 200,
        });
      }}
      onPressOut={() => {
        progress.value = withTiming(0, {
          easing: Easing.linear,
          duration: 200,
        });
      }}
    >
      <AnimatedHStack
        flex={1}
        alignItems="center"
        justifyContent="space-between"
        bg="gray.300"
        pl={4}
        pr={2}
        borderRadius={16}
        style={style}
      >
        <HStack space={3}>
          <IonIcon name={iconName} size={60} color="gray.900" />
          <VStack space={3.5} justifyContent="center">
            <Typography variant="subtitle1">{title}</Typography>
            <Typography variant="caption" color="gray.600">
              {caption}
            </Typography>
          </VStack>
        </HStack>
        <IonIcon name="chevron-forward" size={6} color="gray.900" />
      </AnimatedHStack>
    </Pressable>
  );
};
