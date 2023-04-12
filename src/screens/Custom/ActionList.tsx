import React, { useState, useMemo, useRef } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView } from 'native-base';
import {
  ScreenContainer,
  Header,
  ListRow,
  IonIcon,
  GesturePickerBottomSheetModal,
  SingleBottomSheetModal,
} from '../../components';
import { appList } from '../../features/action/app';
import { Action, App } from '../../features/action/types';
import { CustomStackParamList } from '../../navigation';

interface ActionRowProps {
  action: Action;
  hasBottomBorder: boolean;
  onPress?: () => void;
}

const ActionRow = ({ action, ...props }: ActionRowProps) => {
  return (
    <ListRow
      title={action.description}
      right={<IonIcon name="add-circle-outline" color="gray.500" size={8} />}
      {...props}
    />
  );
};

type ActionListProps = StackScreenProps<CustomStackParamList, 'ActionList'>;

export const ActionList = ({ route }: ActionListProps) => {
  const { appId } = route.params;
  const { name, actions } = useMemo(
    () => appList.find(({ id }) => id === appId) as App,
    [appId],
  );
  const gesturePickerBottomSheetModalRef = useRef<SingleBottomSheetModal>(null);
  const [selectedActionId, setSelectedActionId] = useState<number>(0);

  return (
    <ScreenContainer>
      <Header variant="center" title={name} />
      <ScrollView mx={-3} px={3}>
        {actions.map((action, idx) => (
          <ActionRow
            key={action.id}
            action={action}
            hasBottomBorder={idx === actions.length - 1}
            onPress={() => {
              setSelectedActionId(action.id);
              gesturePickerBottomSheetModalRef.current?.present();
            }}
          />
        ))}
      </ScrollView>
      <GesturePickerBottomSheetModal
        ref={gesturePickerBottomSheetModalRef}
        appId={appId}
        actionId={selectedActionId}
      />
    </ScreenContainer>
  );
};
