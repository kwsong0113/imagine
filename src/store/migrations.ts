import { WhiteListApplicationState } from './slices';
import { initialState as settingInitialState } from './slices/setting';

/**
 * Redux store migrations.
 */
export const migrations = {
  0: (state: WhiteListApplicationState): WhiteListApplicationState => {
    return {
      ...state,
      setting: {
        ...state.setting,
        blankCanvas: settingInitialState.blankCanvas,
      },
    };
  },
};
