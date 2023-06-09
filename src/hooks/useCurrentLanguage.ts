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
