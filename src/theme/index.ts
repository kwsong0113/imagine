import { extendTheme } from 'native-base';
import { darkThemeColors, lightThemeColors } from './colors';
import { fontConfig, fonts } from './fonts';

const defaultTheme = {
  fontConfig,
  fonts,
  components: {
    Text: {
      defaultProps: {
        fontWeight: 500,
      },
    },
  },
};

export const lightTheme = extendTheme({
  ...defaultTheme,
  colors: { ...lightThemeColors },
});

export const darkTheme = extendTheme({
  ...defaultTheme,
  colors: { ...darkThemeColors },
});
