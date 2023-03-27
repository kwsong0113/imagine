import { selectThemeMode, settingActions, ThemeMode } from '../store/slices';
import { useAppDispatch, useAppSelector } from './useApp';

export const useThemeMode = () => {
  const themeMode = useAppSelector(selectThemeMode);
  const dispatch = useAppDispatch();
  return {
    themeMode,
    changeThemeMode: (newThemeMode: ThemeMode) =>
      dispatch(settingActions.changeThemeMode(newThemeMode)),
  };
};
