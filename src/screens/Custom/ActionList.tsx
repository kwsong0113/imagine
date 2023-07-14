import React, { useState, useRef } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ScreenContainer,
  Header,
  ListRow,
  IonIcon,
  GesturePickerBottomSheetModal,
  SingleBottomSheetModal,
  AnimatedIconButton,
  ProgressIcon,
  ScrollableList,
} from '../../components';
import { Action } from '../../features/action/types';
import { CustomStackParamList } from '../../navigation';
import {
  useMatchedApp,
  useGetGestureForActionInstance,
  useGetNumActiveActions,
  useHandleRemoveAction,
} from '../../hooks';
import { useTranslation } from 'react-i18next';

interface ActionRowProps {
  action: Action;
  gestureName?: string;
  isParam: boolean;
  numActiveActions: number;
  hasBottomBorder: boolean;
  onPress?: () => void;
  onRemove?: () => void;
}

const ActionRow = ({
  action,
  gestureName,
  isParam,
  numActiveActions,
  onRemove,
  ...props
}: ActionRowProps) => {
  const { t } = useTranslation('appList');

  return (
    <ListRow
      title={action.description}
      description={
        gestureName ? t('gesture_description', { gestureName }) : undefined
      }
      right={
        numActiveActions === 0 ? (
          <IonIcon name="add-circle-outline" color="gray.500" size={8} />
        ) : isParam ? (
          <ProgressIcon progress={numActiveActions} total={numActiveActions} />
        ) : (
          <AnimatedIconButton
            name="remove-circle-outline"
            color="red.500"
            size={8}
            onPress={onRemove}
          />
        )
      }
      {...props}
    />
  );
};

type ActionListProps = NativeStackScreenProps<
  CustomStackParamList,
  'ActionList'
>;

export const ActionList = ({ navigation, route }: ActionListProps) => {
  const { appId } = route.params;
  const matchedApp = useMatchedApp(appId);
  const gesturePickerBottomSheetModalRef = useRef<SingleBottomSheetModal>(null);
  const [selectedActionId, setSelectedActionId] = useState<number>(0);
  const getGestureForActionInstance = useGetGestureForActionInstance();
  const getNumActiveActions = useGetNumActiveActions();
  const handleRemoveAction = useHandleRemoveAction();

  return (
    <>
      <ScreenContainer>
        <Header variant="center" title={matchedApp?.name} />
        <ScrollableList>
          {matchedApp?.actions.map((action, idx) => {
            const isParam = 'urlSchemeFunc' in action;
            const gesture = getGestureForActionInstance({
              appId,
              actionId: action.id,
            });
            return (
              <ActionRow
                key={action.id}
                action={action}
                gestureName={isParam ? undefined : gesture?.name}
                isParam={isParam}
                numActiveActions={getNumActiveActions(appId, action.id)}
                hasBottomBorder={idx === matchedApp?.actions.length - 1}
                onPress={() => {
                  if (isParam) {
                    navigation.navigate('ParamActionList', {
                      appId,
                      actionId: action.id,
                    });
                  } else {
                    setSelectedActionId(action.id);
                    gesturePickerBottomSheetModalRef.current?.present();
                  }
                }}
                onRemove={() => {
                  if (!isParam && gesture?.id) {
                    handleRemoveAction(gesture.id, action.description);
                  }
                }}
              />
            );
          })}
        </ScrollableList>
      </ScreenContainer>
      <GesturePickerBottomSheetModal
        ref={gesturePickerBottomSheetModalRef}
        appId={appId}
        actionId={selectedActionId}
      />
    </>
  );
};
