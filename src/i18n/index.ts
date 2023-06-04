import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { store } from '../store';
import { getLocaleLanguage } from '../utils';
import * as en from './en';
import * as ko from './ko';

const resources: Resource = {
  en: {
    ...en,
  },
  ko: {
    ...ko,
  },
} as const;

export const initI18n = () => {
  const settingLanguage = store.getState().setting.language;
  const lng =
    settingLanguage === 'kor'
      ? 'ko'
      : settingLanguage === 'eng'
      ? 'en'
      : getLocaleLanguage();

  i18n.use(initReactI18next).init({
    resources,
    lng,
    fallbackLng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: 'v3',
  });
};

export default i18n;
