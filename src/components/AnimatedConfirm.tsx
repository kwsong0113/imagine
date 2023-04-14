import React, { useEffect, useState } from 'react';
import { Box, Center, useTheme } from 'native-base';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { AnimatedCheckmark } from './AnimatedCheckmark';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const Radius = 36;
const Length = 2 * Math.PI * Radius;

interface Props {
  color?: string;
}

export const AnimatedConfirm = ({ color }: Props) => {
  const { colors } = useTheme();
  const circleProgress = useSharedValue(0);
  const circleAreaProgress = useSharedValue(0);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      circleProgress.value = withTiming(1, {
        duration: 1000,
      });
    }, 300);
    setTimeout(() => {
      circleAreaProgress.value = withSpring(1, {
        mass: 2,
      });
    }, 1500);
    setTimeout(() => {
      setIsChecked(true);
    }, 2200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedCircleProps = useAnimatedProps(() => ({
    strokeDashoffset: Length - Length * circleProgress.value,
  }));

  const animatedCircleAreaProps = useAnimatedProps(() => ({
    r: 42 * circleAreaProgress.value,
  }));

  return (
    <Center>
      <Svg width={140} height={140} transform={[{ rotate: '-90deg' }]}>
        <Circle
          cx={70}
          cy={70}
          r={Radius}
          fill="none"
          stroke={colors.gray[300]}
          strokeWidth={14}
          strokeDasharray={Length}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <AnimatedCircle
          cx={70}
          cy={70}
          r={Radius}
          fill="none"
          stroke={color ?? colors.blue[500]}
          strokeWidth={6}
          strokeDasharray={Length}
          strokeLinecap="round"
          strokeLinejoin="round"
          animatedProps={animatedCircleProps}
        />
        <AnimatedCircle
          cx={70}
          cy={70}
          fill={color ?? colors.blue[500]}
          animatedProps={animatedCircleAreaProps}
        />
      </Svg>
      <Box position="absolute">
        <AnimatedCheckmark
          isChecked={isChecked}
          size={50}
          color={colors.gray[100]}
        />
      </Box>
    </Center>
  );
};
