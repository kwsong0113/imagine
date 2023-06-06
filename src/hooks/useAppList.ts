import { useMemo } from 'react';
import { useCurrentLangauge } from './useCurrentLanguage';
import { appList as appListKo } from '../features/action/app_ko';
import { appList as appListEn } from '../features/action/app_en';
import { App } from '../features/action/types';

export const useAppList = () => {
  const langauge = useCurrentLangauge();
  return useMemo(
    () =>
      langauge === 'kor'
        ? [...appListKo].sort(compareApps)
        : [...appListEn].sort(compareApps),
    [langauge],
  );
};

const compareApps = ({ name: name1 }: App, { name: name2 }: App) => {
  return name1.localeCompare(name2);
};
