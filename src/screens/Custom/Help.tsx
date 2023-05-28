import React, { useRef, useState } from 'react';
import {
  ScreenContainer,
  Typography,
  AnimatedIconButton,
  MaterialCommunityIcon,
  AnimatedButton,
} from '../../components';
import { Box, HStack, Image, ScrollView, VStack } from 'native-base';
import { CustomStackParamList } from '../../navigation';
import { StackScreenProps } from '@react-navigation/stack';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { Linking, useWindowDimensions } from 'react-native';
import { HelpCard } from '../../components/HelpCard';

const HELP_CARD_DATA = [
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

const HELP_DESCRIPTION_DATA = [
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

type HelpProps = StackScreenProps<CustomStackParamList, 'Help'>;

export const Help = ({ navigation }: HelpProps) => {
  const [index, setIndex] = useState(0);

  return (
    <ScreenContainer>
      <HStack justifyContent="space-between">
        <HStack space={3}>
          <MaterialCommunityIcon
            name="book-open-page-variant"
            size={30}
            color="gray.400"
          />
          <Typography variant="bigText" mt={1} color="gray.400">
            Linky 설명서
          </Typography>
        </HStack>
        <AnimatedIconButton
          variant="material"
          name="close"
          color="gray.400"
          size={30}
          onPress={() => {
            navigation.navigate('Home');
          }}
        />
      </HStack>
      <ScrollView mx={-6} px={6} mb={-6} mt={-2}>
        <VStack bg="gray.200" mx={-6} pt={6}>
          <Typography variant="body" color="gray.600" px={6}>
            Linky 똑똑하게 활용하는 법
          </Typography>
          <HelpCarousel
            onSnapToItem={(newIndex: number) => setIndex(newIndex)}
          />
        </VStack>
        <HelpDescription index={index} />
        <VStack alignItems="center" py={6} space={8}>
          <Image
            w={120}
            h={120}
            source={require('../../assets/images/help/question.png')}
            alt="qna"
          />
          <Typography variant="bigText" lineHeight={36} textAlign="center">
            {'Linky에 대해\n더 궁금한 점이 있으신가요?'}
          </Typography>
          <HStack space={4} pb={100} mt={2}>
            <AnimatedButton
              bg="teal.500"
              title="문의•요청하기"
              onPress={() => Linking.openURL('mailto:linky.dev.app@gmail.com')}
            />
          </HStack>
        </VStack>
      </ScrollView>
    </ScreenContainer>
  );
};

interface HelpCarouselProps {
  onSnapToItem: (index: number) => void;
}

const HelpCarousel = ({ onSnapToItem }: HelpCarouselProps) => {
  const { width } = useWindowDimensions();
  const ref = useRef<ICarouselInstance>(null);

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
      data={HELP_CARD_DATA}
      renderItem={({ item, index }) => (
        <HelpCard
          {...item}
          isFirstCard={index === 0}
          isLastCard={index === HELP_CARD_DATA.length - 1}
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
  return (
    <Box h={202} mx={-6}>
      <VStack bg="gray.300" p={6}>
        {HELP_DESCRIPTION_DATA[index].map((description, idx) => (
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
