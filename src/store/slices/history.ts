import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { ActionInstance } from '../../features/action/types';
import { differenceInCalendarDays, isSameDay } from 'date-fns';

interface ActionHistory {
  actionInstance: ActionInstance;
  date: number;
}

export interface HistoryState {
  actionHistoryList: ActionHistory[];
}

const initialState: HistoryState = {
  actionHistoryList: [],
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addActionHistory: (
      state,
      action: PayloadAction<{
        actionInstance: ActionInstance;
        date: number;
      }>,
    ) => {
      const { actionInstance, date } = action.payload;
      state.actionHistoryList.push({
        actionInstance,
        date,
      });
    },
    clearActionHistoryList: state => {
      state.actionHistoryList = [];
    },
  },
});

export const historyActions = historySlice.actions;
export const selectActionHistoryList = (state: RootState) =>
  state.history.actionHistoryList;

export const selectNumActionsPerDay = createSelector(
  selectActionHistoryList,
  actionHistoryList => {
    if (actionHistoryList.length === 0) {
      return 0;
    }

    const numDays =
      differenceInCalendarDays(new Date(), actionHistoryList[0].date) + 1;

    return actionHistoryList.length / numDays;
  },
);

export const selectActionHistoryListToday = createSelector(
  selectActionHistoryList,
  actionHistoryList => {
    const now = new Date();
    const idx = actionHistoryList.findIndex(({ date }) => isSameDay(date, now));
    if (idx === -1) {
      return [];
    }
    return actionHistoryList.slice(idx);
  },
);

export default historySlice.reducer;
