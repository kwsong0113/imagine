import React from 'react';
import { HStack, Pressable } from 'native-base';
import {
  AnimatedIconButton,
  Header,
  IonIcon,
  ScreenContainer,
} from '../../components';
import { CustomStackParamList } from '../../navigation';
import { StackScreenProps } from '@react-navigation/stack';

type Props = StackScreenProps<CustomStackParamList, 'Home'>;

export const Custom = ({ navigation }: Props) => {
  return (
    <ScreenContainer>
      <HStack justifyContent="space-between">
        <Header
          hasBackButton={false}
          title="커스텀 제스처"
          description="원하는 액션을 커스텀 제스처로 실행해요"
        />
        <AnimatedIconButton name="hand-left" color="orange.700" size={26} />
      </HStack>
      <Pressable onPress={() => navigation.navigate('AppList')}>
        <IonIcon name="chevron-forward-outline" size={30} />
      </Pressable>
    </ScreenContainer>
  );
};
