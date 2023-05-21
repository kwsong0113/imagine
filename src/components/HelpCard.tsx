import { HStack, Image, VStack } from 'native-base';
import React, { ComponentProps } from 'react';
import { AnimatedIconButton } from './AnimatedIconButton';
import { Typography } from './Typography';

const imageMap: Record<number, any> = {
  0: {
    source: require('../assets/images/help/launch.png'),
    width: 155,
    height: 360,
    alt: 'launch',
  },
  1: {
    source: require('../assets/images/help/add_gesture.png'),
    width: 127,
    height: 360,
    alt: 'add_gesture',
  },
  2: {
    source: require('../assets/images/help/add_action.png'),
    width: 177,
    height: 360,
    alt: 'add_action',
  },
  3: {
    source: require('../assets/images/help/widget.png'),
    width: 177,
    height: 360,
    alt: 'widget',
  },
  4: {
    source: require('../assets/images/help/execute.png'),
    width: 177,
    height: 360,
    alt: 'execute',
  },
  5: {
    source: require('../assets/images/help/statistics.png'),
    width: 177,
    height: 360,
    alt: 'statistics',
  },
};

interface Props {
  bg: ComponentProps<typeof HStack>['bg'];
  color: ComponentProps<typeof Typography>['color'];
  isFirstCard: boolean;
  isLastCard: boolean;
  imageId: number;
  subtitle: string;
  titleArray: string[];
  onPressBack?: () => void;
  onPressForward?: () => void;
}

export const HelpCard = ({
  bg,
  color,
  isFirstCard,
  isLastCard,
  imageId,
  subtitle,
  titleArray,
  onPressBack,
  onPressForward,
}: Props) => {
  return (
    <HStack
      bg={bg}
      p={4}
      pr={6}
      borderRadius={24}
      h={400}
      justifyContent="space-between"
    >
      <VStack justifyContent="space-between">
        <VStack space={5}>
          <Typography variant="body" color={color}>
            {subtitle}
          </Typography>
          <VStack space={2}>
            {titleArray.map(title => (
              <Typography key={title} variant="bigTitle" color={color}>
                {title}
              </Typography>
            ))}
          </VStack>
        </VStack>
        <HStack space={2}>
          {!isFirstCard && (
            <AnimatedIconButton
              name="arrow-back-circle"
              size={16}
              color={color}
              onPress={onPressBack}
            />
          )}
          {!isLastCard && (
            <AnimatedIconButton
              name="arrow-forward-circle"
              size={16}
              color={color}
              onPress={onPressForward}
            />
          )}
        </HStack>
      </VStack>
      <Image alignSelf="flex-end" resizeMode="contain" {...imageMap[imageId]} />
    </HStack>
  );
};
