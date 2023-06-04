import React, { useEffect, useRef } from 'react';
import {
  OptionSingleBottomSheetModal,
  SingleBottomSheetModal,
} from '../../../components';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useBottomSheetModal } from '@gorhom/bottom-sheet';
import { selectLanguage, settingActions } from '../../../store/slices';
import { getLocaleLanguage } from '../../../utils';

export const LanguageBottomSheetModal = () => {
  const bottomSheetModalRef = useRef<SingleBottomSheetModal>(null);
  const { dismiss } = useBottomSheetModal();
  const dispatch = useAppDispatch();
  const language = useAppSelector(selectLanguage);
  const shouldShowLanguagePicker = language === 'locale';

  useEffect(() => {
    if (shouldShowLanguagePicker) {
      bottomSheetModalRef.current?.present();
    }
  }, [shouldShowLanguagePicker]);

  return (
    <OptionSingleBottomSheetModal
      ref={bottomSheetModalRef}
      title="어떤 언어를 사용하시겠어요?"
      leftButtonTitle="한국어"
      rightButtonTitle="English"
      onPressLeft={() => {
        dispatch(settingActions.changeLanguage('kor'));
        dismiss();
      }}
      onPressRight={() => {
        dispatch(settingActions.changeLanguage('eng'));
        dismiss();
      }}
      onDismiss={() => {
        if (language === 'locale') {
          dispatch(
            settingActions.changeLanguage(
              getLocaleLanguage() === 'ko' ? 'kor' : 'eng',
            ),
          );
        }
      }}
    />
  );
};
