import React, { forwardRef } from 'react';
import { VStack } from 'native-base';
import { Typography } from './Typography';
import { SettingOptionRow } from './SettingOptionRow';
import { Language, selectLanguage, settingActions } from '../store/slices';
import { SingleBottomSheetModal } from './index';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hooks';
import { languageCaption } from '../utils';

type LanguageBottomSheetModalProps = {
  title: string;
};

export const LanguageBottomSheetModal = forwardRef<
  SingleBottomSheetModal,
  LanguageBottomSheetModalProps
>((props, ref) => {
  const dispatch = useDispatch();
  const language = useAppSelector(selectLanguage);
  const { title } = props;

  return (
    <SingleBottomSheetModal ref={ref}>
      <VStack px={6} pt={3.5} pb={7.5} space={4}>
        <Typography bold variant="subtitle1">
          {title}
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
                    // @ts-ignore
                    if (ref) {
                      ref.current?.dismiss();
                    }
                    dispatch(
                      settingActions.changeLanguage(languageOption as Language),
                    );
                  }}
                />
              ),
          )}
        </VStack>
      </VStack>
    </SingleBottomSheetModal>
  );
});
