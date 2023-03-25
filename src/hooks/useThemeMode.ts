import { selectThemeMode, settingActions } from '../store/slices';
import { useAppDispatch, useAppSelector } from './useApp';

export const useThemeMode = () => {
  const themeMode = useAppSelector(selectThemeMode);
  const dispatch = useAppDispatch();
  return {
    themeMode,
    changeThemeMode: (newThemeMode: ReturnType<typeof selectThemeMode>) =>
      dispatch(settingActions.changeThemeMode(newThemeMode)),
  };
};
