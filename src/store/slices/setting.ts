import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

export type ThemeMode = 'light' | 'dark' | 'system';
export type Language = 'kor' | 'eng';

interface SettingState {
  themeMode: ThemeMode;
  language: Language;
  shouldShowHelp: boolean;
}

const initialState: SettingState = {
  themeMode: 'light',
  language: 'kor',
  shouldShowHelp: true,
};

const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    changeThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload;
    },
    changeLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
    stopShowHelp: state => {
      state.shouldShowHelp = false;
    },
  },
});

export const settingActions = settingSlice.actions;
export const selectThemeMode = (state: RootState) => state.setting.themeMode;
export const selectLanguage = (state: RootState) => state.setting.language;
export const selectShouldShowHelp = (state: RootState) =>
  state.setting.shouldShowHelp;
export default settingSlice.reducer;
