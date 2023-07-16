// import the original type declarations
import 'i18next';
// import all namespaces (for the default language, only)
import * as ko from '../i18n/ko';

// react-i18next versions higher than 11.11.0
declare module 'i18next' {
  // and extend them!
  interface CustomTypeOptions {
    resources: {
      custom: typeof ko.custom;
      setting: typeof ko.setting;
      appList: typeof ko.appList;
      paramActionList: typeof ko.paramActionList;
      statistics: typeof ko.statistics;
      gesture: typeof ko.gesture;
      help: typeof ko.help;
      updateProgress: typeof ko.updateProgress;
    };
  }
}
