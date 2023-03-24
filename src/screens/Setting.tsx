import React from 'react';
import { Switch, VStack, Icon } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useColorMode } from '../hooks';
import { useAppDispatch } from '../hooks';
import { settingActions } from '../store/slices';
import { Header, IonIcon, ListRow, ScreenContainer } from '../components';

export const Setting = () => {
  const colorMode = useColorMode();
  const dispatch = useAppDispatch();

  return (
    <ScreenContainer>
      <Header
        hasBackButton={false}
        title="설정"
        description="나에게 맞는 옵션을 찾아보세요"
      />
      <VStack flex={1}>
        <ListRow
          left={
            <Icon
              as={MaterialCommunityIcons}
              name="theme-light-dark"
              size="40px"
              color="gray.900"
            />
          }
          title="테마"
          caption="라이트 모드"
          hasBottomBorder={false}
          right={<IonIcon name="chevron-forward" color="gray.600" size={6} />}
        />
        <ListRow
          left={<IonIcon name="language" size="40px" color="gray.900" />}
          title="언어"
          caption="한국어"
          hasBottomBorder={false}
          right={<IonIcon name="chevron-forward" color="gray.600" size={6} />}
        />
        <ListRow
          left={<IonIcon name="logo-apple" size="40px" color="gray.900" />}
          title="다이나믹 아일랜드"
          caption="다이나믹 아일랜드에서 앱을 바로 실행해요"
          hasBottomBorder={true}
          right={
            <Switch
              size="sm"
              isChecked={colorMode === 'light'}
              onTrackColor="orange.800"
              onThumbColor="gray.100"
              offTrackColor="gray.300"
              offThumbColor="gray.100"
              onToggle={() => {
                dispatch(
                  settingActions.changeTheme(
                    colorMode === 'light' ? 'dark' : 'light',
                  ),
                );
              }}
            />
          }
        />
      </VStack>
    </ScreenContainer>
  );
};
