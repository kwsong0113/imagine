import React, { useCallback } from 'react';
import { useToast } from 'native-base';
import { Toast } from '../components';

interface Props {
  iconName?: string;
  iconColor?: string;
  message: string;
  duration?: number;
  placement?: 'bottom' | 'top';
  bg?: string;
}

export const useRenderToast = () => {
  const toast = useToast();

  const renderToast = useCallback(
    ({
      iconName = 'checkmark-circle',
      iconColor = 'blue.500',
      message,
      duration = 500,
      placement = 'bottom',
      bg,
    }: Props) => {
      toast.show({
        render: () => (
          <Toast
            bg={bg}
            iconName={iconName}
            iconColor={iconColor}
            message={message}
          />
        ),
        duration,
        placement,
      });
    },
    [toast],
  );

  return renderToast;
};
