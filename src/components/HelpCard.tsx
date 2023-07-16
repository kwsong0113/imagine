import { HStack, Image, VStack } from 'native-base';
import React, { ComponentProps } from 'react';
import { useCurrentLangauge } from '../hooks';
import { getStaticImageUrl } from '../utils';
import { AnimatedIconButton } from './AnimatedIconButton';
import { Typography } from './Typography';

const imageMap: Record<
  number,
  {
    width: number;
    height: number;
    key: string;
  }
> = {
  0: {
    width: 155,
    height: 360,
    key: 'launch',
  },
  1: {
    width: 127,
    height: 360,
    key: 'add_gesture',
  },
  2: {
    width: 177,
    height: 360,
    key: 'add_action',
  },
  3: {
    width: 177,
    height: 360,
    key: 'widget',
  },
  4: {
    width: 177,
    height: 360,
    key: 'execute',
  },
  5: {
    width: 177,
    height: 360,
    key: 'statistics',
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
  const prefix = useCurrentLangauge() === 'kor' ? 'ko' : 'en';
  const { key, ...restImageProps } = imageMap[imageId];

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
      <Image
        alignSelf="flex-end"
        resizeMode="contain"
        alt={key}
        source={{
          uri: getStaticImageUrl(`/help/${prefix}/${key}.png`),
        }}
        fallbackElement={<></>}
        {...restImageProps}
      />
    </HStack>
  );
};
