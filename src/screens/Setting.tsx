import React, { useCallback, useRef, useState } from 'react';
import { VStack, HStack, Box, useTheme, Center, Switch } from 'native-base';
import { useThemeMode } from '../hooks';
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
import {
  BlankCanvasButtonPosition,
  Language,
  selectAutoLaunch,
  selectBlankCanvasButtonPosition,
  selectLanguage,
  settingActions,
  ThemeMode,
} from '../store/slices';
import { useAppSelector, useAppDispatch } from '../hooks';
import { useBottomSheetModal } from '@gorhom/bottom-sheet';
import { gestureActions } from '../store/slices/gesture';
import { useNavigation } from '@react-navigation/native';
import { RootTabNavigationProp } from '../navigation';
import { getLocaleLanguage } from '../utils';
import { useTranslation } from 'react-i18next';

const themeModeList: ThemeMode[] = ['light', 'dark', 'system'];

const SettingThemeModeRow = () => {
  const { themeMode, changeThemeMode } = useThemeMode();
  const bottomSheetModalRef = useRef<SingleBottomSheetModal>(null);
  const { t } = useTranslation('setting');

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
        title={t('theme.title')}
        caption={t(`theme.${themeMode}`)}
        right={<IonIcon name="chevron-forward" color="gray.600" size={6} />}
        onPress={handlePress}
      />
      <SingleBottomSheetModal ref={bottomSheetModalRef}>
        <VStack px={6} pt={3.5} pb={7.5} space={4}>
          <Typography bold variant="subtitle1">
            {t('theme.title')}
          </Typography>
          <VStack mx={-3}>
            {themeModeList.map(themeModeOption => (
              <SettingOptionRow
                key={themeModeOption}
                title={t(`theme.${themeModeOption}`)}
                isSelected={themeModeOption === themeMode}
                onPress={() => changeThemeMode(themeModeOption as ThemeMode)}
              />
            ))}
          </VStack>
        </VStack>
      </SingleBottomSheetModal>
    </>
  );
};

const languageCaption: Record<Language, string> = {
  kor: '한국어',
  eng: 'English',
  locale: getLocaleLanguage() === 'kor' ? '한국어' : 'English',
};

const SettingLanguageRow = () => {
  const { t } = useTranslation('setting');
  const language = useAppSelector(selectLanguage);
  const dispatch = useAppDispatch();
  const bottomSheetModalRef = useRef<SingleBottomSheetModal>(null);

  const handlePress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <>
      <ListRow
        left={<IonIcon name="language" size="40px" color="gray.900" />}
        title={t('language.title')}
        caption={languageCaption[language]}
        right={<IonIcon name="chevron-forward" color="gray.600" size={6} />}
        onPress={handlePress}
      />
      <SingleBottomSheetModal ref={bottomSheetModalRef}>
        <VStack px={6} pt={3.5} pb={7.5} space={4}>
          <Typography bold variant="subtitle1">
            {t('language.title')}
          </Typography>
          <VStack mx={-3}>
            {Object.entries(languageCaption).map(
              ([languageOption, caption]) =>
                languageOption !== 'locale' && (
                  <SettingOptionRow
                    key={languageOption}
                    title={caption}
                    isSelected={languageOption === language}
                    onPress={() => {
                      dispatch(
                        settingActions.changeLanguage(
                          languageOption as Language,
                        ),
                      );
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

const blankCanvasButtonPositionList: BlankCanvasButtonPosition[] = [
  'none',
  'bottom right',
  'bottom left',
  'mid right',
  'mid left',
  'top right',
  'top left',
];

const SettingBlankCanvasButtonPositionRow = () => {
  const { t } = useTranslation('setting');
  const blankCanvasButtonPosition = useAppSelector(
    selectBlankCanvasButtonPosition,
  );
  const dispatch = useAppDispatch();
  const bottomSheetModalRef = useRef<SingleBottomSheetModal>(null);

  const handlePress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <>
      <ListRow
        left={<IonIcon name="move" size="40px" color="gray.900" />}
        title={t('blankCanvasButtonPosition.title')}
        caption={t(`blankCanvasButtonPosition.${blankCanvasButtonPosition}`)}
        right={<IonIcon name="chevron-forward" color="gray.600" size={6} />}
        onPress={handlePress}
      />
      <SingleBottomSheetModal ref={bottomSheetModalRef}>
        <VStack px={6} pt={3.5} pb={7.5} space={4}>
          <Typography bold variant="subtitle1">
            {t('blankCanvasButtonPosition.sheet_title')}
          </Typography>
          <VStack mx={-3}>
            {blankCanvasButtonPositionList.map(
              blankCanvasButtonPositionOption => (
                <SettingOptionRow
                  key={blankCanvasButtonPositionOption}
                  title={t(
                    `blankCanvasButtonPosition.${blankCanvasButtonPositionOption}`,
                  )}
                  isSelected={
                    blankCanvasButtonPosition ===
                    blankCanvasButtonPositionOption
                  }
                  onPress={() => {
                    dispatch(
                      settingActions.changeBlankCanvasButtonPosition(
                        blankCanvasButtonPositionOption,
                      ),
                    );
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

const SettingAutoLaunchRow = () => {
  const { t } = useTranslation('setting');
  const isChecked = useAppSelector(selectAutoLaunch);
  const dispatch = useAppDispatch();

  return (
    <>
      <ListRow
        left={
          <MaterialCommunityIcon
            name="rocket-launch"
            size="40px"
            color="gray.900"
          />
        }
        title={t('autolaunch.title')}
        caption={t('autolaunch.caption')}
        right={
          <HStack alignItems="center">
            <Center
              bg="teal.50"
              px={2}
              h={23}
              borderRadius={12}
              borderColor="teal.700"
              borderWidth={1}
            >
              <Typography variant="caption" color="teal.700">
                {t('autolaunch.beta')}
              </Typography>
            </Center>
            <Switch
              size="sm"
              isChecked={isChecked}
              onToggle={() => {
                dispatch(settingActions.toggleAutoLaunch());
              }}
              onTrackColor="teal.700"
              onThumbColor="gray.100"
              offTrackColor="gray.300"
              offThumbColor="gray.100"
            />
          </HStack>
        }
        isPressable={false}
      />
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
  const { t } = useTranslation('setting');
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
        title={t('reset.title')}
        caption={t('reset.caption')}
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
              fontWeight="bold"
              color={colors.gray[900]}
              content={t('reset.bottomsheet.message')}
              duration={800}
            />
          </VStack>
        ) : (
          <VStack px={6} pt={3.5} pb={7.5} space={4}>
            <VStack space={2}>
              <Typography bold variant="subtitle1">
                {t('reset.bottomsheet.title')}
              </Typography>
              <Typography variant="description" color="gray.600" py={1}>
                {t('reset.bottomsheet.description')}
              </Typography>
            </VStack>
            <HStack space={4}>
              <AnimatedButton
                bg="gray.500"
                title={t('reset.bottomsheet.cancel')}
                onPress={() => dismiss()}
              />
              <AnimatedButton
                bg="red.600"
                title={t('reset.bottomsheet.ok')}
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
  const { t } = useTranslation('setting');
  const navigation = useNavigation<RootTabNavigationProp<'Setting'>>();

  return (
    <ListRow
      left={<IonIcon name="hand-left" size="40px" color="gray.900" />}
      title={t('help.title')}
      caption={t('help.description')}
      right={<IonIcon name="chevron-forward" color="gray.600" size={6} />}
      hasBottomBorder={true}
      onPress={() => {
        navigation.navigate('Help');
      }}
    />
  );
};

export const Setting = () => {
  const { t } = useTranslation('setting');

  return (
    <ScreenContainer>
      <Header
        hasBackButton={false}
        title={t('title')}
        description={t('description')}
      />
      <VStack flex={1}>
        <SettingThemeModeRow />
        <SettingLanguageRow />
        <SettingAutoLaunchRow />
        <SettingBlankCanvasButtonPositionRow />
        {/* <SettingDynamicIslandRow /> */}
        {/* <SettingGestureStorageRow /> */}
        <SettingClearGestureRow />
        <SettingHelpRow />
      </VStack>
    </ScreenContainer>
  );
};
