import React, { useEffect, useState } from 'react';
import { PropsWithChildren } from 'react';
import { CodePushStatus, useCodePush } from '../hooks';
import RNBootSplash from 'react-native-bootsplash';
import { Box } from 'native-base';

export const WithCodePush = ({ children }: PropsWithChildren<{}>) => {
  const { status, isMandatory } = useCodePush();
  const [showingBootSplash, setShowingBootSplash] = useState(true);

  useEffect(() => {
    if (
      showingBootSplash &&
      status !== CodePushStatus.CHECKING &&
      status !== CodePushStatus.IDLE
    ) {
      setShowingBootSplash(false);
      RNBootSplash.hide({ fade: true, duration: 100 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (showingBootSplash) {
    return <Box flex={1} bg="gray.100" />;
  }

  if (isMandatory) {
    // 다운로드 중 -> 설치 중 -> 재설치 버튼
    return null;
  }

  return <>{children}</>;

  // 앱 보여주기
};
