import React, { useRef, useState } from 'react';
import {
  Typography,
  AnimatedIconButton,
  MaterialCommunityIcon,
  AnimatedButton,
  ScrollableList,
} from '../../components';
import { Box, HStack, Image, VStack } from 'native-base';
import { AppStackScreenProps } from '../../navigation';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { Linking, useWindowDimensions } from 'react-native';
import { HelpCard } from '../../components/';
import { useTranslation } from 'react-i18next';
import { useCurrentLangauge } from '../../hooks';
import { getCardData, getHelpData, getStaticImageUrl } from '../../utils';

export const Help = ({ navigation }: AppStackScreenProps<'Help'>) => {
  const { t } = useTranslation('help');
  const [index, setIndex] = useState(0);

  return (
    <VStack bg="gray.100" flex={1} px={6} pb={6}>
      <HStack justifyContent="space-between" py={5}>
        <HStack space={3}>
          <MaterialCommunityIcon
            name="book-open-page-variant"
            size={30}
            color="gray.400"
          />
          <Typography bold variant="bigText" mt={1} color="gray.400">
            {t('title')}
          </Typography>
        </HStack>
        <AnimatedIconButton
          variant="material"
          name="close"
          color="gray.400"
          size={30}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </HStack>
      <ScrollableList>
        <VStack bg="gray.200" mx={-6} pt={5}>
          <Typography variant="body" color="gray.600" px={6}>
            {t('description')}
          </Typography>
          <HelpCarousel
            onSnapToItem={(newIndex: number) => setIndex(newIndex)}
          />
        </VStack>
        <HelpDescription index={index} />
        <VStack alignItems="center" pt={12} pb={6} space={8}>
          <Image
            w={120}
            h={120}
            source={{ uri: getStaticImageUrl('/help/question.png') }}
            fallbackElement={<></>}
            alt="qna"
          />
          <Typography variant="bigText" lineHeight={36} textAlign="center">
            {t('more_question')}
          </Typography>
          <HStack space={4} pb={100} mt={2}>
            <AnimatedButton
              bg="teal.500"
              title={t('button_title')}
              onPress={() => Linking.openURL('mailto:linky.dev.app@gmail.com')}
            />
          </HStack>
        </VStack>
      </ScrollableList>
    </VStack>
  );
};

interface HelpCarouselProps {
  onSnapToItem: (index: number) => void;
}

const HelpCarousel = ({ onSnapToItem }: HelpCarouselProps) => {
  const { width } = useWindowDimensions();
  const ref = useRef<ICarouselInstance>(null);
  const langauge = useCurrentLangauge();
  const data = getCardData(langauge);

  return (
    <Carousel
      ref={ref}
      mode="parallax"
      loop={false}
      width={width}
      height={400}
      modeConfig={{
        parallaxScrollingScale: (width - 2 * 24) / width,
        parallaxScrollingOffset:
          (width *
            (1 - (((width - 2 * 24) / width) * (width - 2 * 24)) / width)) /
            2 +
          24 -
          12,
      }}
      data={data}
      renderItem={({ item, index }) => (
        <HelpCard
          {...item}
          isFirstCard={index === 0}
          isLastCard={index === data.length - 1}
          onPressBack={() => {
            ref.current?.prev();
          }}
          onPressForward={() => {
            ref.current?.next();
          }}
        />
      )}
      onSnapToItem={onSnapToItem}
    />
  );
};

interface HelpDescriptionProps {
  index: number;
}

const HelpDescription = ({ index }: HelpDescriptionProps) => {
  const language = useCurrentLangauge();
  const data = getHelpData(language);

  return (
    <Box h={202} mx={-6}>
      <VStack bg="gray.300" p={6}>
        {data[index].map((description, idx) => (
          <HStack key={description} space={2}>
            {idx !== 0 && (
              <Typography
                variant="body"
                mb={0}
                color="gray.800"
                lineHeight="30"
              >
                ●
              </Typography>
            )}
            <Typography
              variant={idx === 0 ? 'subtitle2' : 'body'}
              mb={idx === 0 ? 1 : 0}
              color="gray.800"
              lineHeight={30}
              flex={1}
            >
              {description}
            </Typography>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};
