import { NonLocaleLanguage, selectLanguage } from '../store/slices';
import { getLocaleLanguage } from '../utils';
import { useAppSelector } from './useApp';

export const useCurrentLangauge = (): NonLocaleLanguage => {
  const language = useAppSelector(selectLanguage);
  if (language === 'locale') {
    return getLocaleLanguage();
  }
  return language;
};
