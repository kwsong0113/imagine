import React, { ComponentProps } from 'react';
import { Pressable } from 'native-base';
import { IonIcon } from './IonIcon';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  Easing,
} from 'react-native-reanimated';

type Props = {
  onPress?: () => void;
} & ComponentProps<typeof IonIcon>;

export const AnimatedIconButton = ({ onPress, ...props }: Props) => {
  const pressing = useSharedValue(0);

  const outlineStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            pressing.value,
            [0, 1],
            [1, 0.5],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  return (
    <Pressable
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
      <Animated.View style={outlineStyle}>
        <IonIcon {...props} />
      </Animated.View>
    </Pressable>
  );
};
