import React from 'react';
import { ScrollView } from 'native-base';
import {
  AppIcon,
  Header,
  IonIcon,
  ListRow,
  ScreenContainer,
  ProgressIcon,
} from '../../components';
import { CustomStackNavigationProp } from '../../navigation';
import { appList } from '../../features/action/app';
import { useGetNumActiveActions } from '../../hooks';
import { App } from '../../features/action/types';
import { useNavigation } from '@react-navigation/native';

interface AppRowProps {
  app: App;
  numActiveActions: number;
  hasBottomBorder: boolean;
}

const AppRow = ({
  app: { id, name, actions },
  numActiveActions,
  hasBottomBorder,
}: AppRowProps) => {
  const navigation = useNavigation<CustomStackNavigationProp>();

  return (
    <ListRow
      key={id}
      left={<AppIcon id={id} name={name} />}
      right={
        numActiveActions === 0 ? (
          <IonIcon name="add-circle-outline" color="gray.500" size={8} />
        ) : (
          <ProgressIcon progress={numActiveActions} total={actions.length} />
        )
      }
      title={name}
      description={`${actions.length}개의 액션${
        numActiveActions > 0 ? ` 중 ${numActiveActions}개 사용 중` : ''
      }`}
      hasBottomBorder={hasBottomBorder}
      onPress={() => {
        navigation.navigate('ActionList', {
          appId: id,
        });
      }}
    />
  );
};

export const AppList = () => {
  const getNumActiveActions = useGetNumActiveActions();

  return (
    <ScreenContainer>
      <Header
        title="앱 빠르게 실행하기"
        description="앱의 원하는 지점으로 빠르게 이동하세요"
      />
      <ScrollView mx={-3} px={3}>
        {appList.map((app, idx) => {
          const numActiveActions = getNumActiveActions(app.id);
          return (
            <AppRow
              key={app.id}
              app={app}
              numActiveActions={numActiveActions}
              hasBottomBorder={idx === appList.length - 1}
            />
          );
        })}
      </ScrollView>
    </ScreenContainer>
  );
};
