import React, { useEffect, useRef } from 'react';
import {
  OptionSingleBottomSheetModal,
  SingleBottomSheetModal,
} from '../../../components';
import { CustomStackParamList } from '../../../navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useBottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import {
  selectShouldShowHelp,
  selectLanguage,
  settingActions,
} from '../../../store/slices';

type HomeNavigationProp = StackNavigationProp<CustomStackParamList, 'Home'>;

export const HelpBottomSheetModal = () => {
  const bottomSheetModalRef = useRef<SingleBottomSheetModal>(null);
  const { dismiss } = useBottomSheetModal();
  const navigation = useNavigation<HomeNavigationProp>();
  const dispatch = useAppDispatch();
  const shouldShowHelp = useAppSelector(selectShouldShowHelp);
  const shouldShowLanguagePicker = useAppSelector(selectLanguage) === 'locale';

  useEffect(() => {
    if (shouldShowHelp && !shouldShowLanguagePicker) {
      bottomSheetModalRef.current?.present();
    }
  }, [shouldShowHelp, shouldShowLanguagePicker]);

  return (
    <OptionSingleBottomSheetModal
      ref={bottomSheetModalRef}
      title="Linky 설명서를 읽어볼래요?"
      description="Linky 앱을 똑똑하게 활용하는 법을 알려드릴게요"
      leftButtonTitle="그만 보기"
      rightButtonTitle="설명서 보기"
      onPressLeft={() => {
        dispatch(settingActions.stopShowHelp());
        dismiss();
      }}
      onPressRight={() => {
        dismiss();
        navigation.navigate('Help');
      }}
    />
  );
};
