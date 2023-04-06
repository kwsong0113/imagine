import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CanvasPoints, PointCloud } from '../../gesture/types';
import uuid from 'react-native-uuid';
import { RootState } from '..';

interface Gesture {
  id: string;
  name: string;
  data: GestureDataElement[];
}

interface GestureDataElement {
  canvasPoints: CanvasPoints;
  pointCloud: PointCloud;
}

interface ActionInstance {
  appId: number;
  actionId: number;
  param?: string;
}

interface GestureState {
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
      action: PayloadAction<{ name: string; gesture: GestureDataElement }>,
    ) => {
      const id = uuid.v4() as string;
      const { name, gesture } = action.payload;
      state.gestureList.push({
        id,
        name,
        data: [gesture],
      });
    },
    addGestureData: (
      state,
      action: PayloadAction<{ id: string; gesture: GestureDataElement }>,
    ) => {
      state.gestureList.forEach(({ id, data }) => {
        if (id === action.payload.id) {
          data.push(action.payload.gesture);
        }
      });
    },
    deleteAllGestures: state => {
      state.gestureList = [];
    },
  },
});

export const gestureActions = gestureSlice.actions;
export const selectGestureList = (state: RootState) =>
  state.gesture.gestureList;

export default gestureSlice.reducer;
