import { extendTheme } from 'native-base';
import { lightThemeColors } from './colors';
import { fontConfig, fonts } from './fonts';

/**
 * TODO: create useTheme hook that returns light or dark theme (after redux-persist setup)
 */
export const theme = extendTheme({
  fontConfig,
  fonts,
  colors: { ...lightThemeColors },
  components: {
    Text: {
      defaultProps: {
        fontWeight: 500,
      },
    },
    Box: {
      defaultProps: {
        bg: 'gray.100',
      },
    },
  },
});
