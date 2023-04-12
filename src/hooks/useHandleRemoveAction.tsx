import React, { useCallback } from 'react';
import { useToast } from 'native-base';
import { gestureActions } from '../store/slices/gesture';
import { useAppDispatch } from './useApp';
import { Toast } from '../components';

export const useHandleRemoveAction = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const callback = useCallback(
    (id: string, name: string) => {
      dispatch(gestureActions.unassignGestureToAction({ id }));
      toast.show({
        render: () => (
          <Toast
            variant="description"
            iconName="checkmark-circle"
            iconColor="red.700"
            bg="gray.300"
            message={`${name} 액션을 삭제했어요`}
          />
        ),
        duration: 1000,
      });
    },
    [dispatch, toast],
  );
  return callback;
};
