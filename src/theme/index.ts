import { extendTheme } from 'native-base';
import { darkThemeColors, lightThemeColors } from './colors';
import { typography } from './typography';

const defaultTheme = {
  ...typography,
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
