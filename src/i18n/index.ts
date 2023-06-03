import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';
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

i18n.use(initReactI18next).init({
  resources,
  lng: getLocales()[0].languageCode,
  fallbackLng: 'en',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: 'v3',
});

export default i18n;
