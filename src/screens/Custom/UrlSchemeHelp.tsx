import React from 'react';
import { Header, ScreenContainer, Typography, IonIcon } from '../../components';
import { ScrollView, HStack, VStack } from 'native-base';

const Subtitle = ({ children }: { children: string }) => {
  return (
    <HStack space={1} alignItems="center" pt={1.5} pb={0.5}>
      <IonIcon name="alert-circle" color="gray.800" size={5} />
      <Typography bold variant="body" color="gray.800">
        {children}
      </Typography>
    </HStack>
  );
};

const Article = ({ children }: { children: string }) => {
  return (
    <Typography variant="info" color="gray.600" lineHeight={28}>
      {children}
    </Typography>
  );
};

interface LinkWithDescriptionProps {
  link: string;
  description?: string;
}

const LinkWithDescription = ({
  link,
  description,
}: LinkWithDescriptionProps) => {
  return (
    <VStack bg="gray.300" px={3} py={4} space={2} borderRadius={8}>
      <Typography variant="description" color="red.700">
        {link}
      </Typography>
      {description ? (
        <Typography variant="description" color="gray.600">
          {description}
        </Typography>
      ) : undefined}
    </VStack>
  );
};

export const UrlSchemeHelp = () => {
  return (
    <ScreenContainer>
      <Header variant="center" title="URL Scheme이 무엇인가요?" />
      <ScrollView px={5} mx={-3} mb={-6}>
        <VStack space={4} pb={4}>
          {/* <Typography variant="subtitle1">URL Scheme이 무엇인가요?</Typography> */}
          <VStack space={3}>
            <Subtitle>URL Scheme = 앱의 주소</Subtitle>
            <Article>
              URL Scheme은 앱을 실행시킬 수 있는 주소를 말해요. 웹사이트가
              주소를 가지고 있는 것처럼, 앱도 주소를 가지고 있는 것이죠. 예를
              들면, 아래의 URL Scheme은 네이버 앱을 실행시켜요.
            </Article>
            <LinkWithDescription link="naversearchapp://" />
            <Subtitle>앱의 원하는 지점으로 이동하기</Subtitle>
            <Article>
              URL Scheme의 특별한 점은 단순히 앱을 실행시키는 것이 아니라 앱의
              특정 지점으로 바로 이동할 수 있다는 거에요. 인스타그램 앱을 예를
              들어볼게요.
            </Article>
            <LinkWithDescription
              link="instagram://reels_home"
              description="인스타그램 앱의 릴스 페이지로 이동해요"
            />
            <LinkWithDescription
              link="instagram://user?username=honggildong"
              description="아이디가 honggildong인 유저의 페이지로 이동해요"
            />
            <LinkWithDescription
              link="instagram://camera"
              description="인스타그램 스토리를 올릴 수 있는 카메라를 실행해요"
            />
          </VStack>
        </VStack>
      </ScrollView>
    </ScreenContainer>
  );
};
