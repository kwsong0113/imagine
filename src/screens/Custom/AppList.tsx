import React, { useRef, useState } from 'react';
import { ScrollView } from 'native-base';
import { StackScreenProps } from '@react-navigation/stack';
import {
  AppIcon,
  Header,
  IonIcon,
  ListRow,
  ScreenContainer,
  ProgressIcon,
  GesturePickerBottomSheetModal,
  SingleBottomSheetModal,
  AnimatedIconButton,
} from '../../components';
import { CustomStackParamList } from '../../navigation';
import { appList, CUSTOM_URL_SCHEME_ID } from '../../features/action/app';
import {
  useGetGestureForActionInstance,
  useGetNumActiveActions,
  useHandleRemoveAction,
} from '../../hooks';
import { Action, App } from '../../features/action/types';
import { Gesture } from '../../features/gesture/types';

interface AppRowProps {
  app: App;
  numActiveActions: number;
  hasBottomBorder: boolean;
  gestureName?: string;
  onPress?: () => void;
  onRemove?: () => void;
}

const AppRow = ({
  app: { id, name, actions },
  numActiveActions,
  hasBottomBorder,
  gestureName,
  onPress,
  onRemove,
}: AppRowProps) => {
  return (
    <ListRow
      key={id}
      left={<AppIcon id={id} name={name} />}
      right={
        numActiveActions === 0 ? (
          <IonIcon name="add-circle-outline" color="gray.500" size={8} />
        ) : actions.length === 1 ? (
          <AnimatedIconButton
            name="remove-circle-outline"
            color="red.500"
            size={8}
            onPress={onRemove}
          />
        ) : (
          <ProgressIcon progress={numActiveActions} total={actions.length} />
        )
      }
      title={name}
      description={
        actions.length === 1
          ? gestureName
            ? `${gestureName} 제스처`
            : actions[0].description
          : `${actions.length}개의 액션${
              numActiveActions > 0 ? ` 중 ${numActiveActions}개 사용 중` : ''
            }`
      }
      hasBottomBorder={hasBottomBorder}
      onPress={onPress}
    />
  );
};

type AppListProps = StackScreenProps<CustomStackParamList, 'AppList'>;

export const AppList = ({ navigation }: AppListProps) => {
  const getNumActiveActions = useGetNumActiveActions();
  const gesturePickerBottomSheetModalRef = useRef<SingleBottomSheetModal>(null);
  const [selectedAppId, setSelectedAppId] = useState<number>(0);
  const [selectedActionId, setSelectedActionId] = useState<number>(0);
  const handleRemoveAction = useHandleRemoveAction();
  const getGestureForActionInstance = useGetGestureForActionInstance();

  return (
    <ScreenContainer>
      <Header
        title="앱 빠르게 실행하기"
        description="앱의 원하는 지점으로 빠르게 이동하세요"
      />
      <ScrollView mx={-3} px={3}>
        {appList.map((app, idx) => {
          if (app.id === CUSTOM_URL_SCHEME_ID) {
            return;
          }
          const numActiveActions = getNumActiveActions(app.id);
          const hasSingleAction = app.actions.length === 1;
          let gesture: Gesture | undefined;
          let singleAction: Action;
          if (hasSingleAction) {
            singleAction = app.actions[0];
            gesture = getGestureForActionInstance({
              appId: app.id,
              actionId: singleAction.id,
            });
          }
          return (
            <AppRow
              key={app.id}
              app={app}
              numActiveActions={numActiveActions}
              hasBottomBorder={idx === appList.length - 1}
              gestureName={hasSingleAction ? gesture?.name : undefined}
              onPress={() => {
                if (hasSingleAction) {
                  setSelectedAppId(app.id);
                  setSelectedActionId(singleAction.id);
                  gesturePickerBottomSheetModalRef.current?.present();
                } else {
                  navigation.navigate('ActionList', {
                    appId: app.id,
                  });
                }
              }}
              onRemove={
                hasSingleAction
                  ? () => {
                      if (gesture?.id) {
                        handleRemoveAction(
                          gesture.id,
                          singleAction.description,
                        );
                      }
                    }
                  : undefined
              }
            />
          );
        })}
      </ScrollView>
      <GesturePickerBottomSheetModal
        ref={gesturePickerBottomSheetModalRef}
        appId={selectedAppId}
        actionId={selectedActionId}
      />
    </ScreenContainer>
  );
};
