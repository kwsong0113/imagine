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
import { MaterialCommunityIcon } from './MaterialCommunityIcon';

type Props = {
  variant?: 'ion' | 'material';
  onPress?: () => void;
} & ComponentProps<typeof IonIcon>;

export const AnimatedIconButton = ({
  variant = 'ion',
  onPress,
  ...props
}: Props) => {
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
        {variant === 'ion' ? (
          <IonIcon {...props} />
        ) : (
          <MaterialCommunityIcon {...props} />
        )}
      </Animated.View>
    </Pressable>
  );
};
