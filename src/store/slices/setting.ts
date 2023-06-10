import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import i18next from 'i18next';
import { RootState } from '..';
import { getLocaleLanguage } from '../../utils';

export type ThemeMode = 'light' | 'dark' | 'system';
export type Language = 'kor' | 'eng' | 'locale';
export type BlankCanvasButtonPosition =
  | 'top right'
  | 'top left'
  | 'mid right'
  | 'mid left'
  | 'bottom right'
  | 'bottom left'
  | 'none';

export type Version = '1.1.0';

export type BlankCanvas = {
  autoLaunch: boolean;
  blankCanvasButtonPosition: BlankCanvasButtonPosition;
};

export interface SettingState {
  themeMode: ThemeMode;
  language: Language;
  shouldShowHelp: boolean;
  shouldShowNewFeature: boolean;
  version: Version;
  blankCanvas: BlankCanvas;
}

export const initialState: SettingState = {
  themeMode: 'system',
  language: 'locale',
  shouldShowHelp: true,
  shouldShowNewFeature: true,
  version: '1.1.0',
  blankCanvas: {
    autoLaunch: true,
    blankCanvasButtonPosition: 'bottom right',
  },
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
      i18next.changeLanguage(action.payload === 'eng' ? 'en' : 'ko');
    },
    changeLanguageFromLocale: state => {
      state.language = getLocaleLanguage();
    },
    stopShowHelp: state => {
      state.shouldShowHelp = false;
    },
    toggleAutoLaunch: state => {
      state.blankCanvas.autoLaunch = !state.blankCanvas.autoLaunch;
    },
    changeBlankCanvasButtonPosition: (
      state,
      action: PayloadAction<BlankCanvasButtonPosition>,
    ) => {
      state.blankCanvas.blankCanvasButtonPosition = action.payload;
    },
    stopShowNewFeature: state => {
      state.shouldShowNewFeature = false;
    },
  },
});

export const settingActions = settingSlice.actions;
export const selectThemeMode = (state: RootState) => state.setting.themeMode;
export const selectLanguage = (state: RootState) => state.setting.language;
export const selectShouldShowHelp = (state: RootState) =>
  state.setting.shouldShowHelp;
export const selectAutoLaunch = (state: RootState) =>
  state.setting.blankCanvas.autoLaunch;
export const selectBlankCanvasButtonPosition = (state: RootState) =>
  state.setting.blankCanvas.blankCanvasButtonPosition;
export const selectVersion = (state: RootState) => state.setting.version;
export const selectShouldShowNewFeature = (state: RootState) =>
  state.setting.shouldShowNewFeature;
export default settingSlice.reducer;
