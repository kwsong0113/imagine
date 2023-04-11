import { useTheme } from 'native-base';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Svg, Circle } from 'react-native-svg';

const Radius = 22;
const Length = 2 * Math.PI * Radius;

interface Props {
  progress: number;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const AnimatedCircularProgress = ({ progress }: Props) => {
  const animatedProgress = useSharedValue(0);
  const { colors } = useTheme();

  useEffect(() => {
    animatedProgress.value = withTiming(progress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: Length - Length * animatedProgress.value,
    stroke: interpolateColor(
      animatedProgress.value,
      [0, 0.25, 0.5, 0.75, 1],
      [
        colors.red[500],
        colors.red[500],
        colors.orange[500],
        colors.teal[400],
        colors.blue[500],
      ],
    ),
  }));

  return (
    <Svg style={styles.svg}>
      <Circle
        cx={25}
        cy={25}
        r={Radius}
        stroke={colors.gray[400]}
        fill="none"
        strokeWidth={6}
      />
      <AnimatedCircle
        cx={25}
        cy={25}
        r={Radius}
        stroke={colors.blue[500]}
        fill="none"
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={Length}
        animatedProps={animatedProps}
        transform="rotate(0 0 90)"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  svg: {
    position: 'absolute',
    transform: [{ rotate: '-90deg' }],
  },
});
