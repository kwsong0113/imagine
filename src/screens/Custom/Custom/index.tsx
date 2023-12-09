import React, { useEffect, useRef } from 'react';
import { Box, HStack, VStack } from 'native-base';
import {
  AnimatedIconButton,
  Feature,
  Header,
  IonIcon,
  ListRow,
  ScreenContainer,
  LanguageBottomSheetModal,
  SingleBottomSheetModal,
} from '../../../components';
import { RootTabScreenProps } from '../../../navigation';
import { useAppSelector, useRenderToast } from '../../../hooks';
import { useWindowDimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { HelpBottomSheetModal } from './HelpBottomSheetModal';
import {
  CUSTOM_URL_SCHEME_ID,
  SHORTCUT_ID,
} from '../../../features/action/consts';
import { NewFeatureBottomSheetModal } from './NewFeatureBottomSheetModal';
import { selectLanguage } from '../../../store/slices';

export const Custom = ({ navigation }: RootTabScreenProps<'Custom'>) => {
  const bottomSheetModalRef = useRef<SingleBottomSheetModal>(null);
  const renderToast = useRenderToast();
  const { height } = useWindowDimensions();
  const { t } = useTranslation('custom');
  const language = useAppSelector(selectLanguage);
  const shouldShowLanguagePicker = language === 'locale';

  useEffect(() => {
    if (shouldShowLanguagePicker) {
      bottomSheetModalRef.current?.present();
    }
  }, [shouldShowLanguagePicker]);

  return (
    <>
      <ScreenContainer>
        <HStack justifyContent="space-between">
          <Box flex={1} mr={-12}>
            <Header
              hasBackButton={false}
              title={t('title')}
              description={t('description')}
            />
          </Box>
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
            title={t('gestures')}
            titleColor="blue.600"
            right={<IonIcon size={6} color="blue.600" name="chevron-forward" />}
            onPress={() =>
              navigation.navigate('CustomStack', { screen: 'GestureList' })
            }
          />
          <ListRow
            title={t('actions')}
            titleColor="blue.600"
            hasBottomBorder={true}
            right={<IonIcon size={6} color="blue.600" name="chevron-forward" />}
            onPress={() =>
              navigation.navigate('CustomStack', { screen: 'WholeActionList' })
            }
          />
        </VStack>
        <VStack
          flex={1}
          space={height < 700 ? 2 : 6}
          my={height < 700 ? -4 : 0}
        >
          <Feature
            iconName="logo-apple-appstore"
            title={t('app_title')}
            caption={t('app_description')}
            onPress={() =>
              navigation.navigate('CustomStack', { screen: 'AppList' })
            }
          />
          <Feature
            iconName="layers"
            title={t('shortcut_title')}
            caption={t('shortcut_description')}
            onPress={() =>
              navigation.navigate('CustomStack', {
                screen: 'ParamActionList',
                params: {
                  appId: SHORTCUT_ID,
                  actionId: 1,
                  type: 'shortcutList',
                },
              })
            }
          />
          <Feature
            iconName="logo-apple"
            title={t('native_action_title')}
            caption={t('native_action_description')}
            onPress={() => {
              renderToast({
                iconName: 'construct',
                iconColor: 'teal.700',
                message: t('toast_message'),
                duration: 1000,
                placement: 'top',
                bg: 'gray.300',
              });
            }}
          />
          <Feature
            iconName="globe"
            title={t('custom_url_scheme_title')}
            caption={t('custom_url_scheme_description')}
            onPress={() =>
              navigation.navigate('CustomStack', {
                screen: 'ParamActionList',
                params: {
                  appId: CUSTOM_URL_SCHEME_ID,
                  actionId: 0,
                  type: 'customURLSchemeList',
                },
              })
            }
          />
        </VStack>
      </ScreenContainer>
      <HelpBottomSheetModal />
      <LanguageBottomSheetModal
        title={t('language_bottomsheet_title')}
        ref={bottomSheetModalRef}
      />
      <NewFeatureBottomSheetModal />
    </>
  );
};
