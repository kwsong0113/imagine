import { useCallback } from 'react';
import { selectGestureToActionMap } from '../store/slices/gesture';
import { useAppSelector } from './useApp';

export const useGetNumActiveActions = () => {
  const gestureToActionMap = useAppSelector(selectGestureToActionMap);
  const callback = useCallback(
    (appId: number, actionId?: number) => {
      if (actionId === undefined) {
        const actionIdSet = new Set();
        Object.values(gestureToActionMap).forEach(actionInstance => {
          if (actionInstance.appId === appId) {
            actionIdSet.add(actionInstance.actionId);
          }
        });
        return actionIdSet.size;
      }
      return Object.values(gestureToActionMap).reduce((acc, cur) => {
        return cur.appId === appId && cur.actionId === actionId ? acc + 1 : acc;
      }, 0);
    },
    [gestureToActionMap],
  );
  return callback;
};
