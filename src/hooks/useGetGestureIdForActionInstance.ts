import { useCallback } from 'react';
import { ActionInstance } from '../features/action/types';
import { selectGestureToActionMap } from '../store/slices/gesture';
import { useAppSelector } from './useApp';

export const useGetGestureIdForActionInstance = () => {
  const gestureToActionMap = useAppSelector(selectGestureToActionMap);
  const callback = useCallback(
    (actionInstance: ActionInstance) => {
      return Object.keys(gestureToActionMap).find(id => {
        const _actionInstance = gestureToActionMap[id];
        return (
          actionInstance.appId === _actionInstance.appId &&
          actionInstance.actionId === _actionInstance.actionId &&
          actionInstance.param === _actionInstance.param
        );
      });
    },
    [gestureToActionMap],
  );
  return callback;
};
