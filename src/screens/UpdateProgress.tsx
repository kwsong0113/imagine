import React from 'react';
import { Center, HStack, Image, useToken, VStack } from 'native-base';
import CodePush, { DownloadProgress } from 'react-native-code-push';
import { Typography } from '../components';
import { CodePushStatus } from '../hooks';
import { Bar } from 'react-native-progress';
import Animated, { Layout, SlideInDown } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native';

export interface UpdateProgressProps {
  status:
    | CodePushStatus.DOWNLOADING
    | CodePushStatus.INSTALLING
    | CodePushStatus.SUCCESS;
  downloadProgress: DownloadProgress;
}

export const UpdateProgress = ({
  status,
  downloadProgress: { receivedBytes, totalBytes },
}: UpdateProgressProps) => {
  const progress = totalBytes === 0 ? 0 : receivedBytes / totalBytes;
  const [gray, primary] = useToken('colors', ['gray', 'primary']);

  return (
    <VStack flex={1} bg="gray.100">
      <Center w="full" h="full" position="absolute">
        <Image
          alt="logo"
          source={require('../assets/images/logo.png')}
          w={200}
          h={200}
        />
      </Center>
      <VStack flex={1} justifyContent="flex-end" safeAreaBottom px={4}>
        <Animated.View entering={SlideInDown} layout={Layout}>
          <VStack bg="grey.900" px={4} py={8} space={8} borderRadius={36}>
            <HStack>
              <Typography variant="subtitle2" color="grey.100" lineHeight={30}>
                {status === CodePushStatus.DOWNLOADING
                  ? '업데이트 다운로드 중 · '
                  : status === CodePushStatus.INSTALLING
                  ? '업데이트 설치 중...'
                  : '업데이트 적용 준비가 완료됐어요'}
              </Typography>
              {status === CodePushStatus.DOWNLOADING && (
                <Typography
                  variant="subtitle2"
                  color="primary.light"
                  lineHeight={30}
                >
                  {Math.round(progress * 100)}%
                </Typography>
              )}
            </HStack>
            {status === CodePushStatus.SUCCESS ? (
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  CodePush.allowRestart();
                }}
              >
                <Center bg="primary.light" borderRadius={16} h={50}>
                  <Typography
                    variant="subtitle2"
                    color="grey.900"
                    lineHeight={30}
                  >
                    앱 재실행
                  </Typography>
                </Center>
              </TouchableOpacity>
            ) : (
              <Bar
                progress={progress}
                animated
                color={primary.light}
                unfilledColor={gray[700]}
                width={null}
                height={20}
                borderRadius={10}
                borderWidth={0}
              />
            )}
          </VStack>
        </Animated.View>
      </VStack>
    </VStack>
  );
};
