import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

type Theme = 'light' | 'dark' | 'system';

interface SettingState {
  theme: Theme;
}

const initialState: SettingState = {
  theme: 'light',
};

const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
  },
});

export const settingActions = settingSlice.actions;
export const selectTheme = (state: RootState) => state.setting.theme;
export default settingSlice.reducer;
