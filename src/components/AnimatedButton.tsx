import React, { ComponentProps } from 'react';
import { Center, Pressable } from 'native-base';
import { Typography } from './Typography';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  Extrapolate,
  Easing,
} from 'react-native-reanimated';

const AnimatedCenter = Animated.createAnimatedComponent(Center);

type Props = {
  title: string;
  onPress?: () => void;
} & Pick<ComponentProps<typeof Center>, 'bg'>;

export const AnimatedButton = ({ title, bg, onPress }: Props) => {
  const pressing = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            pressing.value,
            [0, 1],
            [1, 0.9],
            Extrapolate.CLAMP,
          ),
        },
      ],
      opacity: interpolate(pressing.value, [0, 1], [1, 0.4]),
    };
  });

  return (
    <Pressable
      flex={1}
      onPressIn={() => {
        pressing.value = withTiming(1, {
          easing: Easing.linear,
        });
      }}
      onPressOut={() => {
        pressing.value = withTiming(0);
      }}
      onPress={onPress}
    >
      <AnimatedCenter bg={bg} p={4} borderRadius={16} style={animatedStyle}>
        <Typography variant="subtitle2" color="gray.100">
          {title}
        </Typography>
      </AnimatedCenter>
    </Pressable>
  );
};
