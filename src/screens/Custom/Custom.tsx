import React from 'react';
import { HStack, VStack } from 'native-base';
import {
  AnimatedIconButton,
  Feature,
  Header,
  IonIcon,
  ListRow,
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
        <AnimatedIconButton
          name="hand-left"
          color="orange.700"
          size={26}
          onPress={() => navigation.navigate('BlankCanvas')}
        />
      </HStack>
      <VStack>
        <ListRow
          title="내 제스처 목록 보기"
          titleColor="blue.600"
          right={<IonIcon size={6} color="blue.600" name="chevron-forward" />}
          onPress={() => navigation.navigate('GestureList')}
        />
        <ListRow
          title="내 액션 목록 보기"
          titleColor="blue.600"
          hasBottomBorder={true}
          right={<IonIcon size={6} color="blue.600" name="chevron-forward" />}
        />
      </VStack>
      <Feature
        iconName="logo-apple-appstore"
        title="앱 빠르게 실행하기"
        caption="애플 앱, 써드파티 앱, 설정을 모두 지원해요"
        link="AppList"
      />
      <Feature
        iconName="layers"
        title="단축어 실행하기"
        caption="단축어 이름만 입력하면 등록할 수 있어요"
        link="AppList"
      />
      <Feature
        iconName="logo-apple"
        title="네이티브 액션 실행하기"
        caption="아이폰을 효율적으로 활용하는 기능을 제공해요"
        link="AppList"
      />
      <Feature
        iconName="globe"
        title="커스텀 URL Scheme"
        caption="내가 원하는 액션이 등록돼 있지 않다면 사용해요"
        link="AppList"
      />
    </ScreenContainer>
  );
};
