import React from 'react';
import { Pressable } from 'native-base';
import { Header, IonIcon, ScreenContainer } from '../../components';
import { StackScreenProps } from '@react-navigation/stack';
import { CustomStackParamList } from '../../navigation';

type Props = StackScreenProps<CustomStackParamList, 'AppList'>;

export const AppList = ({ navigation }: Props) => {
  return (
    <ScreenContainer>
      <Header
        title="앱 빠르게 실행하기"
        description="앱의 원하는 지점으로 빠르게 이동하세요"
      />
      <Pressable onPress={() => navigation.navigate('ActionList')}>
        <IonIcon name="chevron-forward-outline" size={30} />
      </Pressable>
    </ScreenContainer>
  );
};
