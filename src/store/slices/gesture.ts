import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Gesture, GestureDataElement } from '../../features/gesture/types';
import { RootState } from '..';
import { ActionInstance } from '../../features/action/types';

export interface GestureState {
  gestureList: Gesture[];
  gestureToActionMap: Record<string, ActionInstance>;
}

const initialState: GestureState = {
  gestureList: [],
  gestureToActionMap: {},
};

const gestureSlice = createSlice({
  name: 'gesture',
  initialState,
  reducers: {
    addGesture: (
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        data: GestureDataElement[];
      }>,
    ) => {
      const { id, name, data } = action.payload;
      state.gestureList.unshift({
        id,
        name,
        data,
      });
    },
    deleteGesture: (state, action: PayloadAction<{ id: string }>) => {
      const { id: idToBeDeleted } = action.payload;
      const idx = state.gestureList.findIndex(
        gesture => gesture.id === idToBeDeleted,
      );
      if (idx > -1) {
        state.gestureList.splice(idx, 1);
      }
      delete state.gestureToActionMap[idToBeDeleted];
    },
    deleteAllGestures: state => {
      state.gestureList = [];
      state.gestureToActionMap = {};
    },
    assignGestureToAction: (
      state,
      action: PayloadAction<{ id: string; actionInstance: ActionInstance }>,
    ) => {
      const { id, actionInstance } = action.payload;
      state.gestureToActionMap[id] = actionInstance;
    },
    unassignGestureToAction: (state, action: PayloadAction<{ id: string }>) => {
      delete state.gestureToActionMap[action.payload.id];
    },
    clearGestureToActionMap: state => {
      state.gestureToActionMap = {};
    },
  },
});

export const gestureActions = gestureSlice.actions;
export const selectGestureList = (state: RootState) =>
  state.gesture.gestureList;
export const selectGestureToActionMap = (state: RootState) =>
  state.gesture.gestureToActionMap;
export const selectActionToGestureMap = createSelector(
  selectGestureToActionMap,
  gestureToActionMap =>
    Object.fromEntries(
      Object.entries(gestureToActionMap).map(([gestureId, actionInstance]) => [
        actionInstance,
        gestureId,
      ]),
    ),
);

export const selectActiveGestureList = createSelector(
  selectGestureList,
  selectGestureToActionMap,
  (gestureList, gestureToActionMap) =>
    gestureList.filter(({ id }) => id in gestureToActionMap),
);

export const selectActionForGestureId = createSelector(
  selectGestureToActionMap,
  (state: RootState, id: string) => id,
  (gestureToActionMap, id) => gestureToActionMap[id],
);

export default gestureSlice.reducer;
