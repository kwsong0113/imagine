import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { VStack, HStack, Center } from 'native-base';
import { IonIcon } from './IonIcon';
import { Typography } from './Typography';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

interface HeaderProps {
  variant?: 'left' | 'center';
  hasBackButton?: boolean;
  title?: string;
  description?: string;
}

export const Header = ({
  variant = 'left',
  hasBackButton = true,
  title,
  description,
}: HeaderProps) => {
  const navigation = useNavigation();
  const pressing = useSharedValue(0);

  const outlineStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            pressing.value,
            [0, 1],
            [1, 0.7],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  return (
    <VStack space="3">
      <HStack space="2.5" alignItems="center">
        {hasBackButton && (
          <TouchableWithoutFeedback
            onPressIn={() => {
              pressing.value = withTiming(1);
            }}
            onPressOut={() => {
              pressing.value = withTiming(0);
            }}
            onPress={navigation.goBack}
          >
            <Animated.View style={outlineStyle}>
              <IonIcon name="chevron-back-circle" color="gray.500" size="30" />
            </Animated.View>
          </TouchableWithoutFeedback>
        )}
        {variant === 'left' ? (
          <Typography variant="title">{title}</Typography>
        ) : (
          <Center flex="1" pr={hasBackButton ? '10' : '0'}>
            <Typography variant="title">{title}</Typography>
          </Center>
        )}
      </HStack>
      {description && variant === 'left' && (
        <Typography variant="body">{description}</Typography>
      )}
    </VStack>
  );
};
