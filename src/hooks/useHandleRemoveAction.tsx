import React, { useCallback } from 'react';
import { useToast } from 'native-base';
import { gestureActions } from '../store/slices/gesture';
import { useAppDispatch } from './useApp';
import { Toast } from '../components';
import { useTranslation } from 'react-i18next';

export const useHandleRemoveAction = () => {
  const { t } = useTranslation('gesture');
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
            message={t('message.remove_action', { name })}
          />
        ),
        duration: 1000,
      });
    },
    [dispatch, toast, t],
  );
  return callback;
};
