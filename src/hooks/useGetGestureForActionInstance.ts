import { useCallback } from 'react';
import { ActionInstance } from '../features/action/types';
import { selectGestureList } from '../store/slices/gesture';
import { useAppSelector } from './useApp';
import { useGetGestureIdForActionInstance } from './useGetGestureIdForActionInstance';

export const useGetGestureForActionInstance = () => {
  const getGestureIdForActionInstance = useGetGestureIdForActionInstance();
  const gestureList = useAppSelector(selectGestureList);

  const callback = useCallback(
    (actionInstance: ActionInstance) => {
      const gestureId = getGestureIdForActionInstance(actionInstance);
      return gestureList.find(({ id }) => id === gestureId);
    },
    [gestureList, getGestureIdForActionInstance],
  );
  return callback;
};
