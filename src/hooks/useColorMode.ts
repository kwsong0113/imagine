import { useColorScheme } from 'react-native';
import { selectTheme } from '../store/slices';
import { useAppSelector } from './useApp';

export const useColorMode = () => {
  const theme = useAppSelector(selectTheme);
  const systemTheme = useColorScheme();
  return theme === 'system' ? systemTheme ?? 'light' : theme;
};
