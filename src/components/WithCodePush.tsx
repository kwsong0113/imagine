import React, { useEffect, useState } from 'react';
import { PropsWithChildren } from 'react';
import { CodePushStatus, useCodePush } from '../hooks';
import RNBootSplash from 'react-native-bootsplash';
import { Box } from 'native-base';
import { UpdateProgress } from '../screens';

export const WithCodePush = ({ children }: PropsWithChildren<{}>) => {
  const { status, isMandatory, downloadProgress } = useCodePush();
  const [showingBootSplash, setShowingBootSplash] = useState(true);

  useEffect(() => {
    if (
      showingBootSplash &&
      status !== CodePushStatus.CHECKING &&
      status !== CodePushStatus.IDLE
    ) {
      setShowingBootSplash(false);
      RNBootSplash.hide({ fade: true, duration: 300 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (showingBootSplash) {
    return <Box flex={1} bg="gray.100" />;
  }

  if (
    isMandatory &&
    (status === CodePushStatus.DOWNLOADING ||
      status === CodePushStatus.INSTALLING ||
      status === CodePushStatus.SUCCESS)
  ) {
    return (
      <UpdateProgress status={status} downloadProgress={downloadProgress} />
    );
  }

  return <>{children}</>;
};
