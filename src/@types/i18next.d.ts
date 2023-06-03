// import the original type declarations
import 'i18next';
// import all namespaces (for the default language, only)
import * as ko from '../i18n/ko';

// react-i18next versions higher than 11.11.0
declare module 'i18next' {
  // and extend them!
  interface CustomTypeOptions {
    // custom namespace type if you changed it
    // defaultNS: "main";
    // custom resources type
    resources: {
      custom: typeof ko.custom;
    };
  }
}
