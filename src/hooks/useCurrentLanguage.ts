import { Language, selectLanguage } from '../store/slices';
import { getLocaleLanguage } from '../utils';
import { useAppSelector } from './useApp';

export const useCurrentLangauge = (): Exclude<Language, 'locale'> => {
  const language = useAppSelector(selectLanguage);
  if (language === 'locale') {
    return getLocaleLanguage();
  }
  return language;
};

export const useCurrentLangaugeValue = <T>(korValue: T, engValue: T): T => {
  const currentLanguage = useCurrentLangauge();
  return currentLanguage === 'kor' ? korValue : engValue;
};
