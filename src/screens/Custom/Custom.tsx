import React, { useEffect, useRef } from 'react';
import { Box, HStack, VStack } from 'native-base';
import {
  AnimatedButton,
  AnimatedIconButton,
  Feature,
  Header,
  IonIcon,
  ListRow,
  ScreenContainer,
  SingleBottomSheetModal,
  Typography,
} from '../../components';
import { CustomStackParamList } from '../../navigation';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { CUSTOM_URL_SCHEME_ID, SHORTCUT_ID } from '../../features/action/app';
import { useAppDispatch, useAppSelector, useRenderToast } from '../../hooks';
import { useBottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { selectShouldShowHelp, settingActions } from '../../store/slices';

type Props = StackScreenProps<CustomStackParamList, 'Home'>;

export const Custom = ({ navigation }: Props) => {
  const renderToast = useRenderToast();

  return (
    <>
      <ScreenContainer>
        <HStack justifyContent="space-between">
          <Header
            hasBackButton={false}
            title="커스텀 제스처"
            description="원하는 액션을 커스텀 제스처로 실행해요"
          />
          <HStack space={4}>
            <AnimatedIconButton
              variant="material"
              name="draw"
              color="blue.500"
              size={26}
              onPress={() => navigation.navigate('BlankCanvas')}
            />
            <AnimatedIconButton
              name="hand-left"
              color="orange.700"
              size={26}
              onPress={() => navigation.navigate('Help')}
            />
          </HStack>
        </HStack>
        <VStack>
          <ListRow
            title="내 제스처 목록 보기 / 추가하기"
            titleColor="blue.600"
            right={<IonIcon size={6} color="blue.600" name="chevron-forward" />}
            onPress={() => navigation.navigate('GestureList')}
          />
          <ListRow
            title="내 액션 목록 보기"
            titleColor="blue.600"
            hasBottomBorder={true}
            right={<IonIcon size={6} color="blue.600" name="chevron-forward" />}
            onPress={() => navigation.navigate('WholeActionList')}
          />
        </VStack>
        <Feature
          iconName="logo-apple-appstore"
          title="앱 빠르게 실행하기"
          caption="애플 앱, 써드파티 앱, 설정을 모두 지원해요"
          onPress={() => navigation.navigate('AppList')}
        />
        <Feature
          iconName="layers"
          title="단축어 실행하기"
          caption="단축어 이름만 입력하면 등록할 수 있어요"
          onPress={() =>
            navigation.navigate('ParamActionList', {
              appId: SHORTCUT_ID,
              actionId: 1,
              type: 'shortcutList',
            })
          }
        />
        <Feature
          iconName="logo-apple"
          title="네이티브 액션 실행하기"
          caption="아이폰을 효율적으로 활용하는 기능을 제공해요"
          onPress={() => {
            renderToast({
              iconName: 'construct',
              iconColor: 'teal.700',
              message: '아직 준비 중인 기능이에요',
              duration: 1000,
              placement: 'top',
              bg: 'gray.300',
            });
          }}
        />
        <Feature
          iconName="globe"
          title="커스텀 URL Scheme"
          caption="내가 원하는 액션이 등록돼 있지 않다면 사용해요"
          onPress={() =>
            navigation.navigate('ParamActionList', {
              appId: CUSTOM_URL_SCHEME_ID,
              actionId: 0,
              type: 'customURLSchemeList',
            })
          }
        />
      </ScreenContainer>
      <OpenHelpBottomSheetModal />
    </>
  );
};

type HomeNavigationProp = StackNavigationProp<CustomStackParamList, 'Home'>;

const OpenHelpBottomSheetModal = () => {
  const bottomSheetModalRef = useRef<SingleBottomSheetModal>(null);
  const { dismiss } = useBottomSheetModal();
  const navigation = useNavigation<HomeNavigationProp>();
  const dispatch = useAppDispatch();
  const shouldShowHelp = useAppSelector(selectShouldShowHelp);

  useEffect(() => {
    if (shouldShowHelp) {
      bottomSheetModalRef.current?.present();
    }
  }, [shouldShowHelp]);

  return (
    <SingleBottomSheetModal ref={bottomSheetModalRef}>
      <VStack px={6} pb={7.5} space={4}>
        <Box position="absolute" right={2} top={-16}>
          <AnimatedIconButton
            name="close-circle"
            size={8}
            color="gray.400"
            onPress={() => {
              dismiss();
            }}
          />
        </Box>
        <VStack space={2}>
          <Typography variant="subtitle1">
            Linky 설명서를 읽어볼래요?
          </Typography>
          <Typography variant="description" color="gray.600" py={1}>
            Linky 앱을 똑똑하게 활용하는 법을 알려드릴게요
          </Typography>
        </VStack>
        <HStack space={4}>
          <AnimatedButton
            bg="gray.500"
            title="그만 보기"
            onPress={() => {
              dispatch(settingActions.stopShowHelp());
              dismiss();
            }}
          />
          <AnimatedButton
            bg="blue.500"
            title="설명서 보기"
            onPress={() => {
              dismiss();
              navigation.navigate('Help');
            }}
          />
        </HStack>
      </VStack>
    </SingleBottomSheetModal>
  );
};
