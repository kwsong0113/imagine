import React, { useState } from 'react';
import { Switch, VStack } from 'native-base';
import { useThemeMode } from '../hooks';
import {
  Header,
  IonIcon,
  MaterialCommunityIcon,
  ListRow,
  ScreenContainer,
} from '../components';

const themeModeCaption: Record<
  ReturnType<typeof useThemeMode>['themeMode'],
  string
> = {
  light: '라이트 모드',
  dark: '다크 모드',
  system: '시스템 설정과 같이',
};

const SettingThemeModeRow = () => {
  const { themeMode } = useThemeMode();

  return (
    <ListRow
      left={
        <MaterialCommunityIcon
          name="theme-light-dark"
          size="40px"
          color="gray.900"
        />
      }
      title="테마"
      caption={themeModeCaption[themeMode]}
      right={<IonIcon name="chevron-forward" color="gray.600" size={6} />}
    />
  );
};

const SettingLanguageRow = () => {
  return (
    <ListRow
      left={<IonIcon name="language" size="40px" color="gray.900" />}
      title="언어"
      caption="한국어"
      right={<IonIcon name="chevron-forward" color="gray.600" size={6} />}
    />
  );
};

const SettingDynamicIslandRow = () => {
  const [isChecked, setIsChecked] = useState(true);

  return (
    <ListRow
      left={<IonIcon name="toggle-sharp" size="40px" color="gray.900" />}
      title="다이나믹 아일랜드"
      caption="다이나믹 아일랜드에서 앱을 바로 실행해요"
      hasBottomBorder={true}
      right={
        <Switch
          size="sm"
          isChecked={isChecked}
          onToggle={() => setIsChecked(prev => !prev)}
          onTrackColor="orange.800"
          onThumbColor="gray.100"
          offTrackColor="gray.300"
          offThumbColor="gray.100"
        />
      }
    />
  );
};

const SettingGestureStorageRow = () => {
  return (
    <ListRow
      left={<IonIcon name="cloud-download" size="40px" color="gray.900" />}
      title="제스처 저장소에서 가져오기"
      caption="샘플로 제공하는 제스처를 가져와요"
      right={<IonIcon name="chevron-forward" color="gray.600" size={6} />}
    />
  );
};

const SettingClearGestureRow = () => {
  return (
    <ListRow
      left={<IonIcon name="trash-bin" size="40px" color="gray.900" />}
      title="제스처 초기화"
      caption="등록된 제스처를 모두 삭제해요"
      right={<IonIcon name="close-circle" color="gray.600" size={6} />}
    />
  );
};

const SettingHelpRow = () => {
  return (
    <ListRow
      left={<IonIcon name="hand-left" size="40px" color="gray.900" />}
      title="도움말 보기"
      caption="Imagine 앱을 잘 활용하려면 읽어보세요"
      right={<IonIcon name="chevron-forward" color="gray.600" size={6} />}
      hasBottomBorder={true}
    />
  );
};

export const Setting = () => {
  return (
    <ScreenContainer>
      <Header
        hasBackButton={false}
        title="설정"
        description="나에게 맞는 옵션을 찾아보세요"
      />
      <VStack flex={1}>
        <SettingThemeModeRow />
        <SettingLanguageRow />
        <SettingDynamicIslandRow />
        <SettingGestureStorageRow />
        <SettingClearGestureRow />
        <SettingHelpRow />
      </VStack>
    </ScreenContainer>
  );
};
