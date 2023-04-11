import React, { useCallback } from 'react';
import { ScrollView } from 'native-base';
import {
  AppIcon,
  Header,
  IonIcon,
  ListRow,
  ScreenContainer,
} from '../../components';
import { StackScreenProps } from '@react-navigation/stack';
import { CustomStackParamList } from '../../navigation';
import { appList } from '../../features/action/app';
import { useAppSelector } from '../../hooks';
import { selectGestureToActionMap } from '../../store/slices/gesture';

type Props = StackScreenProps<CustomStackParamList, 'AppList'>;

export const AppList = ({}: Props) => {
  const gestureToActionMap = useAppSelector(selectGestureToActionMap);

  const getNumActiveActions = useCallback(
    (id: number) =>
      Object.values(gestureToActionMap).reduce((acc, { appId }) => {
        return appId === id ? acc + 1 : acc;
      }, 0),
    [gestureToActionMap],
  );

  return (
    <ScreenContainer>
      <Header
        title="앱 빠르게 실행하기"
        description="앱의 원하는 지점으로 빠르게 이동하세요"
      />
      <ScrollView mx={-3} px={3}>
        {appList.map(({ id, name, actions }, idx) => {
          const numActiveActions = getNumActiveActions(id);
          return (
            <ListRow
              key={id}
              left={<AppIcon id={id} name={name} />}
              right={
                <IonIcon name="add-circle-outline" color="gray.500" size={8} />
              }
              title={name}
              description={`${actions.length}개의 액션${
                numActiveActions > 0 ? ' 중 ${numActiveActions}개 사용 중' : ''
              }`}
              hasBottomBorder={idx === appList.length - 1}
            />
          );
        })}
      </ScrollView>
    </ScreenContainer>
  );
};
