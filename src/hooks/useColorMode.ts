import { useColorScheme } from 'react-native';
import { selectThemeMode } from '../store/slices';
import { useAppSelector } from './useApp';

export const useColorMode = () => {
  const themeMode = useAppSelector(selectThemeMode);
  const systemColorMode = useColorScheme();
  return themeMode === 'system' ? systemColorMode ?? 'light' : themeMode;
};
