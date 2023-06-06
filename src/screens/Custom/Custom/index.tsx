import React from 'react';
import { Box, HStack, VStack } from 'native-base';
import {
  AnimatedIconButton,
  Feature,
  Header,
  IonIcon,
  ListRow,
  ScreenContainer,
} from '../../../components';
import { CustomStackParamList } from '../../../navigation';
import { StackScreenProps } from '@react-navigation/stack';
import {
  CUSTOM_URL_SCHEME_ID,
  SHORTCUT_ID,
} from '../../../features/action/app_ko';
import { useRenderToast } from '../../../hooks';
import { useWindowDimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { HelpBottomSheetModal } from './HelpBottomSheetModal';
import { LanguageBottomSheetModal } from './LanguageBottomSheetModal';

type Props = StackScreenProps<CustomStackParamList, 'Home'>;

export const Custom = ({ navigation }: Props) => {
  const renderToast = useRenderToast();
  const { height } = useWindowDimensions();
  const { t } = useTranslation('custom');

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
            onPress={() => navigation.navigate('GestureList')}
          />
          <ListRow
            title={t('actions')}
            titleColor="blue.600"
            hasBottomBorder={true}
            right={<IonIcon size={6} color="blue.600" name="chevron-forward" />}
            onPress={() => navigation.navigate('WholeActionList')}
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
            onPress={() => navigation.navigate('AppList')}
          />
          <Feature
            iconName="layers"
            title={t('shortcut_title')}
            caption={t('shortcut_description')}
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
              navigation.navigate('ParamActionList', {
                appId: CUSTOM_URL_SCHEME_ID,
                actionId: 0,
                type: 'customURLSchemeList',
              })
            }
          />
        </VStack>
      </ScreenContainer>
      <HelpBottomSheetModal />
      <LanguageBottomSheetModal />
    </>
  );
};
