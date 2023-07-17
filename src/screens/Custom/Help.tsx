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
import { HelpCard } from '../../components/HelpCard';
import { useTranslation } from 'react-i18next';
import { useCurrentLangauge } from '../../hooks';
import { getStaticImageUrl } from '../../utils';

const HELP_CARD_DATA_KO = [
  {
    bg: 'blue.600',
    color: 'gray.100',
    imageId: 0,
    subtitle: '5 Steps',
    titleArray: ['Linky', '똑똑하게', '활용하는 법'],
  },
  {
    bg: 'blue.200',
    color: 'gray.900',
    imageId: 1,
    subtitle: 'Step 1',
    titleArray: ['제스처', '추가하기'],
  },
  {
    bg: 'teal.600',
    color: 'gray.100',
    imageId: 2,
    subtitle: 'Step 2',
    titleArray: ['액션', '추가하기'],
  },
  {
    bg: 'teal.200',
    color: 'gray.900',
    imageId: 3,
    subtitle: 'Step 3',
    titleArray: ['위젯', '추가하기'],
  },
  {
    bg: 'gray.600',
    color: 'gray.100',
    imageId: 4,
    subtitle: 'Step 4',
    titleArray: ['Linky 앱을', '사용해', '액션', '실행하기'],
  },
  {
    bg: 'gray.300',
    color: 'gray.900',
    imageId: 5,
    subtitle: 'Step 5',
    titleArray: ['통계', '확인하기'],
  },
];

const HELP_CARD_DATA_EN = [
  {
    bg: 'blue.600',
    color: 'gray.100',
    imageId: 0,
    subtitle: '5 Steps',
    titleArray: ['How to ', 'Smartly', 'Utilize Linky'],
  },
  {
    bg: 'blue.200',
    color: 'gray.900',
    imageId: 1,
    subtitle: 'Step 1',
    titleArray: ['Add', 'Gestures'],
  },
  {
    bg: 'teal.600',
    color: 'gray.100',
    imageId: 2,
    subtitle: 'Step 2',
    titleArray: ['Add', 'Actions'],
  },
  {
    bg: 'teal.200',
    color: 'gray.900',
    imageId: 3,
    subtitle: 'Step 3',
    titleArray: ['Add a', 'Lock', 'Screen', 'Widget'],
  },
  {
    bg: 'gray.600',
    color: 'gray.100',
    imageId: 4,
    subtitle: 'Step 4',
    titleArray: ['Execute', 'Actions', 'Using', 'Linky'],
  },
  {
    bg: 'gray.300',
    color: 'gray.900',
    imageId: 5,
    subtitle: 'Step 5',
    titleArray: ['View', 'Statistics'],
  },
];

const HELP_DESCRIPTION_DATA_KO = [
  [
    'Linky는 어떤 앱인가요?',
    '빠르게 제스처를 그려서 앱을 실행해요',
    '어떤 액션을 사용했는지 통계를 분석해요',
  ],
  [
    '알파벳, 하트, 별과 같은 제스처를 추가해요',
    '점 찍기는 사용할 수 없어요',
    '같은 제스처를 4번 그리면 등록돼요',
  ],
  [
    '원하는 액션을 추가하고 액션를 실행할 제스처를 선택 또는 추가해요',
    '원하는 앱이나 액션이 없다면?',
    '커스텀 URL Scheme 메뉴로 가보세요',
    '단축어 메뉴에서 단축어도 추가할 수 있어요',
  ],
  [
    '잠금 화면에 위젯을 추가해요',
    '제스처 그리기 화면으로 바로 이동해요',
    '평소에 Linky 앱을 닫지 않으면 로딩 없이 바로 실행할 수 있어요',
    'iOS 16.0 이상에서만 지원해요',
  ],
  [
    '제스처 그리기 화면에서 액션을 실행해요',
    '제스처 단 한 번으로',
    '다양한 앱과 액션을 빠르게 실행할 수 있어요',
  ],
  [
    '통계를 확인해보세요',
    '먼저 통계 탭으로 이동해요',
    '어떤 앱과 액션을 얼마나 자주 사용했는지 알 수 있어요',
  ],
];

const HELP_DESCRIPTION_DATA_EN = [
  [
    'What can you do with Linky?',
    'Execute apps quickly by drawing gestures.',
    'Check statistics to see which actions you used.',
  ],
  [
    'Add gestures like alphabet, heart, star.',
    'Dotting is not supported.',
    'Draw the same gesture four times to add it.',
  ],
  [
    'Select actions and assign gestures.',
    'Cannot find the action you want?',
    'Check out the Custom URL Scheme menu.',
    'You can also add shortcuts in the Shortcuts menu.',
  ],
  [
    'Add a widget to the lock screen.',
    'You can directly access the gesture drawing screen.',
    'If you keep Linky app open, you can execute actions without loading time.',
    'Supported on iOS 16.0+',
  ],
  [
    'Execute actions from the gesture drawing screen.',
    'Just draw it...',
    'and you can quickly execute various actions.',
  ],
  [
    'Check the statistics.',
    'Navigate to the Statistics tab.',
    'Find out how often you have used different apps and actions.',
  ],
];

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
  const data = langauge === 'kor' ? HELP_CARD_DATA_KO : HELP_CARD_DATA_EN;

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
  const data =
    language === 'kor' ? HELP_DESCRIPTION_DATA_KO : HELP_DESCRIPTION_DATA_EN;

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
