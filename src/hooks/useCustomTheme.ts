import { darkTheme, lightTheme } from '../theme';
import { useColorMode } from './useColorMode';

export const useCustomTheme = () => {
  const colorMode = useColorMode();
  return colorMode === 'light' ? lightTheme : darkTheme;
};
