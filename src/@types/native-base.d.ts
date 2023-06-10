import { lightTheme } from '../theme';

type CustomThemeType = typeof lightTheme;
declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}
