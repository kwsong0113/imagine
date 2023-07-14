import React, { useEffect, useRef } from 'react';
import {
  OptionSingleBottomSheetModal,
  SingleBottomSheetModal,
} from '../../../components';
import { RootTabNavigationProp } from '../../../navigation';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useBottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import {
  selectShouldShowHelp,
  selectLanguage,
  settingActions,
} from '../../../store/slices';
import { useTranslation } from 'react-i18next';

export const HelpBottomSheetModal = () => {
  const bottomSheetModalRef = useRef<SingleBottomSheetModal>(null);
  const { dismiss } = useBottomSheetModal();
  const navigation = useNavigation<RootTabNavigationProp<'Custom'>>();
  const dispatch = useAppDispatch();
  const shouldShowHelp = useAppSelector(selectShouldShowHelp);
  const shouldShowLanguagePicker = useAppSelector(selectLanguage) === 'locale';
  const { t } = useTranslation('custom');

  useEffect(() => {
    if (shouldShowHelp && !shouldShowLanguagePicker) {
      bottomSheetModalRef.current?.present();
    }
  }, [shouldShowHelp, shouldShowLanguagePicker]);

  return (
    <OptionSingleBottomSheetModal
      name="help"
      ref={bottomSheetModalRef}
      title={t('help_bottomsheet.title')}
      description={t('help_bottomsheet.desription')}
      leftButtonTitle={t('help_bottomsheet.left_button_title')}
      rightButtonTitle={t('help_bottomsheet.right_button_title')}
      onPressLeft={() => {
        dispatch(settingActions.stopShowHelp());
        dismiss('help');
      }}
      onPressRight={() => {
        dispatch(settingActions.stopShowHelp());
        dismiss('help');
        navigation.navigate('Help');
      }}
    />
  );
};
