import { getLocales } from 'react-native-localize';
import { Language } from '../store/slices';

export const getLocaleLanguage = (): Exclude<Language, 'locale'> => {
  return getLocales()[0].languageCode === 'ko' ? 'kor' : 'eng';
};
