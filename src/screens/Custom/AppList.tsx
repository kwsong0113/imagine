import React, { useRef, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
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
  ScrollableList,
} from '../../components';
import { CustomStackParamList } from '../../navigation';
import {
  useAppList,
  useGetGestureForActionInstance,
  useGetNumActiveActions,
  useHandleRemoveAction,
} from '../../hooks';
import { Action, App } from '../../features/action/types';
import { Gesture } from '../../features/gesture/types';
import { CUSTOM_URL_SCHEME_ID } from '../../features/action/consts';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('appList');

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
            ? t('gesture_description', { gestureName })
            : actions[0].description
          : numActiveActions > 0
          ? t('num_active_actions', {
              numActions: actions.length,
              numActiveActions,
            })
          : t('num_actions', {
              numActions: actions.length,
            })
      }
      hasBottomBorder={hasBottomBorder}
      onPress={onPress}
    />
  );
};

type AppListProps = NativeStackScreenProps<CustomStackParamList, 'AppList'>;

export const AppList = ({ navigation }: AppListProps) => {
  const { t } = useTranslation('appList');
  const appList = useAppList();
  const getNumActiveActions = useGetNumActiveActions();
  const gesturePickerBottomSheetModalRef = useRef<SingleBottomSheetModal>(null);
  const [selectedAppId, setSelectedAppId] = useState<number>(0);
  const [selectedActionId, setSelectedActionId] = useState<number>(0);
  const handleRemoveAction = useHandleRemoveAction();
  const getGestureForActionInstance = useGetGestureForActionInstance();

  return (
    <>
      <ScreenContainer>
        <Header
          title={t('header.title')}
          description={t('header.description')}
        />
        <ScrollableList>
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
        </ScrollableList>
      </ScreenContainer>
      <GesturePickerBottomSheetModal
        ref={gesturePickerBottomSheetModalRef}
        appId={selectedAppId}
        actionId={selectedActionId}
      />
    </>
  );
};
