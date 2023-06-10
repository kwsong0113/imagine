import React, { useEffect, useRef } from 'react';
import {
  OptionSingleBottomSheetModal,
  SingleBottomSheetModal,
} from '../../../components';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useBottomSheetModal } from '@gorhom/bottom-sheet';
import { selectLanguage, settingActions } from '../../../store/slices';
import { useTranslation } from 'react-i18next';

export const LanguageBottomSheetModal = () => {
  const bottomSheetModalRef = useRef<SingleBottomSheetModal>(null);
  const { dismiss } = useBottomSheetModal();
  const dispatch = useAppDispatch();
  const language = useAppSelector(selectLanguage);
  const shouldShowLanguagePicker = language === 'locale';
  const { t } = useTranslation('custom');

  useEffect(() => {
    if (shouldShowLanguagePicker) {
      bottomSheetModalRef.current?.present();
    }
  }, [shouldShowLanguagePicker]);

  return (
    <OptionSingleBottomSheetModal
      name="langauge"
      ref={bottomSheetModalRef}
      title={t('language_bottomsheet_title')}
      leftButtonTitle="한국어"
      rightButtonTitle="English"
      onPressLeft={() => {
        dispatch(settingActions.changeLanguage('kor'));
        dismiss('langauge');
      }}
      onPressRight={() => {
        dispatch(settingActions.changeLanguage('eng'));
        dismiss('langauge');
      }}
      onDismiss={() => {
        if (language === 'locale') {
          dispatch(settingActions.changeLanguageFromLocale());
        }
      }}
    />
  );
};
