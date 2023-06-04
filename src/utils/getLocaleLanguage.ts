import { getLocales } from 'react-native-localize';

export const getLocaleLanguage = () => {
  return getLocales()[0].languageCode === 'ko' ? 'ko' : 'en';
};
