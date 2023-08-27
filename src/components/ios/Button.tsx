import React from 'react';
import { Center, Pressable } from 'native-base';
import { ComponentProps } from 'react';
import { Font, Text, TextProps } from './Text';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export interface ButtonProps {
  variant?: 'plain' | 'gray' | 'tinted' | 'filled';
  size?: Size;
  color?: TextProps['color'];
  flex?: boolean;
  title: string;
  onPress?: () => void;
}

type Size = 'small' | 'medium' | 'large' | 'full';

const SIZE_TO_BUTTON_STYLE_MAP: Record<
  Size,
  Pick<ComponentProps<typeof Center>, 'h' | 'w' | 'borderRadius'>
> = {
  small: {
    h: 28,
    w: 16,
    borderRadius: 14,
  },
  medium: {
    h: 34,
    w: 74,
    borderRadius: 17,
  },
  large: {
    h: 50,
    w: 90,
    borderRadius: 14,
  },
  full: {
    h: 50,
    w: 'full',
    borderRadius: 14,
  },
};

const SIZE_TO_FONT_MAP: Record<Size, Font> = {
  small: 'subHeadline',
  medium: 'body',
  large: 'body',
  full: 'headline',
};

export const Button = ({
  variant = 'filled',
  size = 'full',
  color = 'system.blue',
  flex = false,
  title,
  onPress,
}: ButtonProps) => {
  const buttonStyle = SIZE_TO_BUTTON_STYLE_MAP[size];
  const pressing = useSharedValue(0);

  const shadowAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(pressing.value, [0, 1], [0, 0.2]),
    };
  });

  const pressableAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(pressing.value, [0, 1], [1, 0.5]),
    };
  });

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => {
        pressing.value = withTiming(1, { duration: 100 });
      }}
      onPressOut={() => {
        pressing.value = withTiming(0, { duration: 300 });
      }}
      flex={flex ? 1 : 0}
      style={variant === 'plain' ? pressableAnimatedStyle : {}}
    >
      <Center {...buttonStyle}>
        <Center
          position="absolute"
          bg={
            variant === 'plain'
              ? 'transparent'
              : variant === 'gray'
              ? 'system.grayButtonBackground'
              : variant === 'tinted' && color === 'system.blue'
              ? 'system.tintedButtonBackground'
              : color
          }
          opacity={variant === 'tinted' && color !== 'system.blue' ? 0.13 : 1}
          {...buttonStyle}
        />

        <Text
          font={SIZE_TO_FONT_MAP[size]}
          color={variant === 'filled' ? 'system.filledButtonText' : color}
          bold
        >
          {title}
        </Text>
        {variant !== 'plain' && (
          <AnimatedCenter
            position="absolute"
            bg="#000000"
            {...buttonStyle}
            style={shadowAnimatedStyle}
          />
        )}
      </Center>
    </AnimatedPressable>
  );
};

const AnimatedCenter = Animated.createAnimatedComponent(Center);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// Plain
// transparent, systemBlue
// gray
// E9E9EB(262529), systemBlue
// tinted
// DEECFF(081F40), systemBlue
// filled
// systemBlue, fefcfe (FFFEFC)

// full, 50

// 90, 50

// 74, 34
//
// 64, 28
