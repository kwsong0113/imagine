import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView } from 'native-base';
import React, { useMemo } from 'react';
import { ScreenContainer, Header, ListRow, IonIcon } from '../../components';
import { appList } from '../../features/action/app';
import { Action } from '../../features/action/types';
import { CustomStackParamList } from '../../navigation';

interface ActionRowProps {
  action: Action;
  hasBottomBorder: boolean;
}

const ActionRow = ({ action, hasBottomBorder }: ActionRowProps) => {
  return (
    <ListRow
      title={action.description}
      hasBottomBorder={hasBottomBorder}
      right={<IonIcon name="add-circle-outline" color="gray.500" size={8} />}
    />
  );
};

type ActionListProps = StackScreenProps<CustomStackParamList, 'ActionList'>;

export const ActionList = ({ route }: ActionListProps) => {
  const { appId } = route.params;
  const { name, actions } = useMemo(() => appList[appId], [appId]);

  return (
    <ScreenContainer>
      <Header variant="center" title={name} />
      <ScrollView mx={-3} px={3}>
        {actions.map((action, idx) => (
          <ActionRow
            action={action}
            hasBottomBorder={idx === actions.length - 1}
          />
        ))}
      </ScrollView>
    </ScreenContainer>
  );
};
