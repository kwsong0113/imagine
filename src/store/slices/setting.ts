import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

type ThemeMode = 'light' | 'dark' | 'system';

interface SettingState {
  themeMode: ThemeMode;
}

const initialState: SettingState = {
  themeMode: 'light',
};

const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    changeThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload;
    },
  },
});

export const settingActions = settingSlice.actions;
export const selectThemeMode = (state: RootState) => state.setting.themeMode;
export default settingSlice.reducer;
