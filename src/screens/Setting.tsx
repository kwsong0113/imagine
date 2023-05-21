import React, { useCallback, useRef, useState } from 'react';
import { VStack, HStack, Box, useTheme } from 'native-base';
import { useRenderToast, useThemeMode } from '../hooks';
import {
  Header,
  IonIcon,
  MaterialCommunityIcon,
  ListRow,
  ScreenContainer,
  Typography,
  SingleBottomSheetModal,
  SettingOptionRow,
  AnimatedConfirm,
  AnimatedSentence,
  AnimatedIconButton,
  AnimatedButton,
} from '../components';
import { Language, selectLanguage, ThemeMode } from '../store/slices';
import { useAppSelector, useAppDispatch } from '../hooks';
import { useBottomSheetModal } from '@gorhom/bottom-sheet';
import { gestureActions } from '../store/slices/gesture';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../navigation';

const themeModeCaption: Record<ThemeMode, string> = {
  light: '라이트 모드',
  dark: '다크 모드',
  system: '시스템 설정과 같이',
};

const SettingThemeModeRow = () => {
  const { themeMode, changeThemeMode } = useThemeMode();
  const bottomSheetModalRef = useRef<SingleBottomSheetModal>(null);

  const handlePress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <>
      <ListRow
        left={
          <MaterialCommunityIcon
            name="theme-light-dark"
            size="40px"
            color="gray.900"
          />
        }
        title="테마"
        caption={themeModeCaption[themeMode]}
        right={<IonIcon name="chevron-forward" color="gray.600" size={6} />}
        onPress={handlePress}
      />
      <SingleBottomSheetModal ref={bottomSheetModalRef}>
        <VStack px={6} pt={3.5} pb={7.5} space={4}>
          <Typography variant="subtitle1">테마</Typography>
          <VStack mx={-3}>
            {Object.entries(themeModeCaption).map(
              ([themeModeOption, caption]) => (
                <SettingOptionRow
                  key={themeModeOption}
                  title={caption}
                  isSelected={themeModeOption === themeMode}
                  onPress={() => changeThemeMode(themeModeOption as ThemeMode)}
                />
              ),
            )}
          </VStack>
        </VStack>
      </SingleBottomSheetModal>
    </>
  );
};

const languageCaption: Record<Language, string> = {
  kor: '한국어',
  eng: '영어',
};

const SettingLanguageRow = () => {
  const language = useAppSelector(selectLanguage);
  // const dispatch = useAppDispatch();
  const bottomSheetModalRef = useRef<SingleBottomSheetModal>(null);

  const handlePress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const renderToast = useRenderToast();

  return (
    <>
      <ListRow
        left={<IonIcon name="language" size="40px" color="gray.900" />}
        title="언어"
        caption={languageCaption[language]}
        right={<IonIcon name="chevron-forward" color="gray.600" size={6} />}
        onPress={handlePress}
      />
      <SingleBottomSheetModal ref={bottomSheetModalRef}>
        <VStack px={6} pt={3.5} pb={7.5} space={4}>
          <Typography variant="subtitle1">언어</Typography>
          <VStack mx={-3}>
            {Object.entries(languageCaption).map(
              ([languageOption, caption]) => (
                <SettingOptionRow
                  key={languageOption}
                  title={caption}
                  isSelected={languageOption === language}
                  onPress={() => {
                    // dispatch(
                    //   settingActions.changeLanguage(languageOption as Language),
                    // )
                    if (languageOption !== 'kor') {
                      renderToast({
                        iconName: 'construct',
                        iconColor: 'teal.700',
                        message: '현재는 한국어만 사용할 수 있어요',
                        duration: 1000,
                        placement: 'top',
                        bg: 'gray.300',
                      });
                    }
                  }}
                />
              ),
            )}
          </VStack>
        </VStack>
      </SingleBottomSheetModal>
    </>
  );
};

// const SettingDynamicIslandRow = () => {
//   const [isChecked, setIsChecked] = useState(true);

//   return (
//     <ListRow
//       left={<IonIcon name="toggle-sharp" size="40px" color="gray.900" />}
//       title="다이나믹 아일랜드"
//       caption="다이나믹 아일랜드에서 앱을 바로 실행해요"
//       right={
//         <Switch
//           size="sm"
//           isChecked={isChecked}
//           onToggle={() => setIsChecked(prev => !prev)}
//           onTrackColor="orange.800"
//           onThumbColor="gray.100"
//           offTrackColor="gray.300"
//           offThumbColor="gray.100"
//         />
//       }
//       isPressable={false}
//     />
//   );
// };

// const SettingGestureStorageRow = () => {
//   return (
//     <ListRow
//       left={<IonIcon name="cloud-download" size="40px" color="gray.900" />}
//       title="제스처 저장소에서 가져오기"
//       caption="샘플로 제공하는 제스처를 가져와요"
//       right={<IonIcon name="chevron-forward" color="gray.600" size={6} />}
//     />
//   );
// };

const SettingClearGestureRow = () => {
  const dispatch = useAppDispatch();
  const { dismiss } = useBottomSheetModal();
  const { colors } = useTheme();
  const bottomSheetModalRef = useRef<SingleBottomSheetModal>(null);
  const [isCleared, setIsCleared] = useState(false);

  const handlePress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleClearGesture = useCallback(() => {
    setIsCleared(true);
    dispatch(gestureActions.deleteAllGestures());
  }, [dispatch]);

  return (
    <>
      <ListRow
        left={<IonIcon name="trash-bin" size="40px" color="gray.900" />}
        title="제스처 초기화"
        caption="등록된 제스처를 모두 삭제해요"
        right={<IonIcon name="close-circle" color="gray.600" size={6} />}
        onPress={handlePress}
      />
      <SingleBottomSheetModal
        ref={bottomSheetModalRef}
        onDismiss={() => setIsCleared(false)}
      >
        {isCleared ? (
          <VStack alignItems="center" pb={12} space={0}>
            <Box position="absolute" right={2} top={-16}>
              <AnimatedIconButton
                name="close-circle"
                size={8}
                color="gray.400"
                onPress={() => dismiss()}
              />
            </Box>
            <AnimatedConfirm color={colors.red[600]} />
            <AnimatedSentence
              fontSize="xl"
              color={colors.gray[900]}
              content="제스처를 초기화했어요"
              duration={800}
            />
          </VStack>
        ) : (
          <VStack px={6} pt={3.5} pb={7.5} space={4}>
            <VStack space={2}>
              <Typography variant="subtitle1">
                제스처를 초기화할까요?
              </Typography>
              <Typography variant="description" color="gray.600" py={1}>
                기존 제스처가 모두 삭제되고 되돌릴 수 없으니 주의하세요
              </Typography>
            </VStack>
            <HStack space={4}>
              <AnimatedButton
                bg="gray.500"
                title="취소"
                onPress={() => dismiss()}
              />
              <AnimatedButton
                bg="red.600"
                title="확인"
                onPress={handleClearGesture}
              />
            </HStack>
          </VStack>
        )}
      </SingleBottomSheetModal>
    </>
  );
};

const SettingHelpRow = () => {
  const navigation = useNavigation<SettingNavigationProp>();

  return (
    <ListRow
      left={<IonIcon name="hand-left" size="40px" color="gray.900" />}
      title="설명서 보기"
      caption="Linky 앱을 잘 활용하려면 읽어보세요"
      right={<IonIcon name="chevron-forward" color="gray.600" size={6} />}
      hasBottomBorder={true}
      onPress={() => {
        navigation.jumpTo('Custom', {
          screen: 'Help',
        });
      }}
    />
  );
};

type SettingNavigationProp = BottomTabNavigationProp<
  RootTabParamList,
  'Setting'
>;

export const Setting = () => {
  return (
    <ScreenContainer>
      <Header
        hasBackButton={false}
        title="설정"
        description="나에게 맞는 옵션을 찾아보세요"
      />
      <VStack flex={1}>
        <SettingThemeModeRow />
        <SettingLanguageRow />
        {/* <SettingDynamicIslandRow /> */}
        {/* <SettingGestureStorageRow /> */}
        <SettingClearGestureRow />
        <SettingHelpRow />
      </VStack>
    </ScreenContainer>
  );
};
