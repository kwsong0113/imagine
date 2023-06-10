import { pick } from '../utils/pick';
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
        ...pick(
          settingInitialState,
          'blankCanvas',
          'version',
          'shouldShowNewFeature',
        ),
      },
    };
  },
};
