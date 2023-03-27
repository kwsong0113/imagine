import React, { useEffect } from 'react';
import { Easing, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg from 'react-native-svg';
import { AnimatedStroke } from './AnimatedStroke';

interface AnimatedCheckmarkProps {
  isChecked: boolean;
  size: number;
  color: string;
}

export const AnimatedCheckmark = ({
  isChecked,
  size,
  color,
}: AnimatedCheckmarkProps) => {
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = withTiming(isChecked ? 1 : 0, {
      duration: isChecked ? 400 : 100,
      easing: Easing.linear,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]);

  return (
    <Svg width={size} height={size} viewBox="0 0 512 512">
      <AnimatedStroke
        progress={progress}
        reverse={true}
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="64"
        d="M416 128L192 384l-96-96"
      />
    </Svg>
  );
};
