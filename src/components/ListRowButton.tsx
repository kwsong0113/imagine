import React from 'react';
import { Pressable, Center, useTheme } from 'native-base';
import { Typography } from './Typography';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolateColor,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

interface Props {
  bg?: string;
  pressedBg?: string;
  title: string;
  onPress?: () => void;
}

const AnimatedCenter = Animated.createAnimatedComponent(Center);

export const ListRowButton = ({ bg, pressedBg, title, onPress }: Props) => {
  const progress = useSharedValue(0);
  const { colors } = useTheme();

  const animatedProps = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [bg ?? colors.gray[200], pressedBg ?? colors.gray[300]],
      ),
      borderRadius: interpolate(progress.value, [0, 1], [0, 8]),
      marginHorizontal: interpolate(progress.value, [0, 1], [0, -3]),
    };
  });

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => {
        progress.value = withTiming(1, {});
      }}
      onPressOut={() => {
        progress.value = withTiming(0, {
          duration: 500,
        });
      }}
    >
      <AnimatedCenter
        py={3}
        borderBottomWidth={1}
        borderTopWidth={1}
        borderColor="gray.300"
        animatedProps={animatedProps}
      >
        <Typography variant="body" color="blue.600">
          {title}
        </Typography>
      </AnimatedCenter>
    </Pressable>
  );
};
