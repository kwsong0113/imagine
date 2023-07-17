import React, { useEffect, useRef } from 'react';
import {
  IonIcon,
  MaterialCommunityIcon,
  OptionSingleBottomSheetModal,
  SingleBottomSheetModal,
  Typography,
} from '../../../components';
import { RootTabParamList } from '../../../navigation';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useBottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import {
  selectShouldShowHelp,
  selectLanguage,
  settingActions,
  selectShouldShowNewFeature,
} from '../../../store/slices';
import { useTranslation } from 'react-i18next';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { HStack, VStack } from 'native-base';

type HomeNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Custom'>;

export const NewFeatureBottomSheetModal = () => {
  const bottomSheetModalRef = useRef<SingleBottomSheetModal>(null);
  const { dismiss } = useBottomSheetModal();
  const navigation = useNavigation<HomeNavigationProp>();
  const dispatch = useAppDispatch();
  const shouldShowNewFeature = useAppSelector(selectShouldShowNewFeature);
  const shouldShowHelp = useAppSelector(selectShouldShowHelp);
  const shouldShowLanguagePicker = useAppSelector(selectLanguage) === 'locale';
  const { t } = useTranslation('custom');

  useEffect(() => {
    if (!shouldShowLanguagePicker && !shouldShowHelp && shouldShowNewFeature) {
      bottomSheetModalRef.current?.present();
    }
  }, [shouldShowLanguagePicker, shouldShowNewFeature, shouldShowHelp]);

  return (
    <OptionSingleBottomSheetModal
      name="new_feature"
      ref={bottomSheetModalRef}
      title={t('new_feature_bottomsheet.title')}
      descriptionComponent={<NewFeatureDescription />}
      rightButtonTitle={t('new_feature_bottomsheet.right_button_title')}
      onPressRight={() => {
        dismiss('new_feature');
        navigation.navigate('Setting');
        dispatch(settingActions.stopShowNewFeature());
      }}
    />
  );
};

const NewFeatureDescription = () => {
  const { t } = useTranslation('custom');
  return (
    <VStack space={2} my={1}>
      <HStack space={2} alignItems="center">
        <MaterialCommunityIcon name="rocket-launch" size={4} color="teal.700" />
        <Typography bold variant="body" lineHeight={24} color="teal.700">
          {t('new_feature_bottomsheet.auto_launch.title')}
        </Typography>
      </HStack>
      <Typography variant="description" color="gray.900" lineHeight={24}>
        {t('new_feature_bottomsheet.auto_launch.description')}
      </Typography>
      <HStack space={2} alignItems="center">
        <IonIcon name="move" size={4} color="teal.700" />
        <Typography bold variant="body" lineHeight={24} color="teal.700">
          {t('new_feature_bottomsheet.gesture_drawing_screen.title')}
        </Typography>
      </HStack>
      <Typography variant="description" color="gray.900" lineHeight={24}>
        {t('new_feature_bottomsheet.gesture_drawing_screen.description')}
      </Typography>
      <HStack space={2} alignItems="center">
        <IonIcon
          name="logo-apple-appstore"
          mt={0.5}
          size={4}
          color="teal.700"
        />
        <Typography bold variant="body" lineHeight={24} color="teal.700">
          {t('new_feature_bottomsheet.more_apps.title')}
        </Typography>
      </HStack>
      <Typography variant="description" color="gray.900" lineHeight={24}>
        {t('new_feature_bottomsheet.more_apps.description')}
      </Typography>
    </VStack>
  );
};
