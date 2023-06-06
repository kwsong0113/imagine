import { useMemo } from 'react';
import { useCurrentLangauge } from './useCurrentLanguage';
import { appList as appListKo } from '../features/action/app_ko';
import { appList as appListEn } from '../features/action/app_en';

export const useAppList = () => {
  const langauge = useCurrentLangauge();
  return useMemo(
    () => (langauge === 'kor' ? appListKo : appListEn),
    [langauge],
  );
};
