import { getLocales } from 'react-native-localize';
import { Language, LocaleLanguage, NonLocaleLanguage } from '../store/slices';

const languages: Record<Language, string> = {
  kor: 'ko',
  eng: 'en',
  fre: 'fr',
  locale: 'en',
};

const languageLocales: Record<NonLocaleLanguage, LocaleLanguage> = {
  kor: '한국어',
  eng: 'English',
  fre: 'Français',
};

const languagesAbbreviations: Record<string, NonLocaleLanguage> = {
  ko: 'kor',
  en: 'eng',
  fr: 'fre',
};

export const getLocaleLanguage = (): NonLocaleLanguage => {
  return languagesAbbreviations[getLocales()[0].languageCode] || 'eng';
};

const getLocale = (): LocaleLanguage => {
  const currentLanguage = getLocaleLanguage();
  return languageLocales[currentLanguage] || 'English';
};

export const languageCaption: Record<Language, string> = {
  kor: '한국어',
  eng: 'English',
  fre: 'Français',
  locale: getLocale(),
};

export const getLanguage = (language: Language) => {
  return languages[language] || 'en';
};
