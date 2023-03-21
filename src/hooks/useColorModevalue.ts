import { useColorMode } from './useColorMode';

export const useColorModeValue = <T>(lightValue: T, darkValue: T) => {
  const colorMode = useColorMode();
  return colorMode === 'light' ? lightValue : darkValue;
};
