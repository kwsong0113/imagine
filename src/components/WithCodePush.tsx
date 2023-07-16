import React from 'react';
import { Center } from 'native-base';
import { PropsWithChildren } from 'react';
import { CodePushStatus, useCodePush } from '../hooks';
import { Typography } from './Typography';

export const WithCodePush = ({ children }: PropsWithChildren<{}>) => {
  const { status, isMandatory } = useCodePush();
  if (status === CodePushStatus.CHECKING) {
    // Show Splash Screen
    return (
      <Center flex={1}>
        <Typography variant="description">Splash Screen</Typography>
      </Center>
    );
  }

  if (isMandatory) {
    // 다운로드 중 -> 설치 중 -> 재설치 버튼
    return null;
  }

  return <>{children}</>;

  // 앱 보여주기
};
