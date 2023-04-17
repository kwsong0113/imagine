import { HStack, VStack, Pressable, useTheme } from 'native-base';
import React from 'react';
import Animated, {
  useSharedValue,
  withTiming,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useColorModeValue } from '../hooks';
import { Typography } from './Typography';

interface Props {
  left?: React.ReactNode;
  right?: React.ReactNode;
  title?: string;
  description?: string;
  caption?: string;
  hasTopBorder?: boolean;
  hasBottomBorder?: boolean;
  titleColor?: string;
  isPressable?: boolean;
  onPress?: () => void;
}

const AnimatedHStack = Animated.createAnimatedComponent(HStack);

export const ListRow = ({
  left,
  right,
  title,
  description,
  caption,
  hasTopBorder = true,
  hasBottomBorder = false,
  titleColor,
  isPressable = true,
  onPress,
}: Props) => {
  const { colors } = useTheme();
  const subColor = useColorModeValue(300, 200);
  const progress = useSharedValue(0);
  const animatedProps = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [
          colors.gray[100],
          isPressable ? colors.gray[subColor] : colors.gray[100],
        ],
      ),
    };
  });

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => {
        progress.value = withTiming(1, {
          // easing: Easing.linear,
          // duration: 300,
        });
      }}
      onPressOut={() => {
        progress.value = withTiming(0, {
          duration: 500,
        });
      }}
    >
      <AnimatedHStack
        mx={-1}
        px={3}
        pt={3}
        pb={description ? '11px' : 3}
        space={3}
        alignItems="center"
        borderColor={`gray.${subColor}`}
        borderTopWidth={hasTopBorder ? 1 : 0}
        borderBottomWidth={hasBottomBorder ? 1 : 0}
        borderRadius={8}
        // bg={isPressable && isPressed ? subColor : undefined}
        style={animatedProps}
      >
        {left}
        {(title || description || caption) && (
          <VStack flex={1} space={description ? '7px' : 2}>
            {title && (
              <Typography variant="body" color={titleColor}>
                {title}
              </Typography>
            )}
            {description && (
              <Typography
                variant="description"
                color="gray.600"
                isTruncated={true}
                lineHeight={16}
              >
                {description}
              </Typography>
            )}
            {caption && (
              <Typography variant="caption" color="gray.600" isTruncated={true}>
                {caption}
              </Typography>
            )}
          </VStack>
        )}
        {right}
      </AnimatedHStack>
    </Pressable>
  );
};
