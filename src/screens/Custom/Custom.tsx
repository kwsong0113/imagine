import React from 'react';
import { Pressable } from 'native-base';
import { Header, IonIcon, ScreenContainer } from '../../components';
import { CustomStackParamList } from '../../navigation';
import { StackScreenProps } from '@react-navigation/stack';

type Props = StackScreenProps<CustomStackParamList, 'Home'>;

export const Custom = ({ navigation }: Props) => {
  return (
    <ScreenContainer>
      <Header
        hasBackButton={false}
        title="커스텀 제스처"
        description="원하는 액션을 커스텀 제스처로 실행해요"
      />
      <Pressable onPress={() => navigation.navigate('AppList')}>
        <IonIcon name="chevron-forward-outline" size={30} />
      </Pressable>
    </ScreenContainer>
  );
};
