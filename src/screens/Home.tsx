import { Box, VStack } from 'native-base';
import React from 'react';
import {
  BorderedBox,
  Button,
  IconButton,
  ScrollableScreen,
  Text,
} from '../components/ios';
import { useHeader } from '../hooks';
import { AppStackNavigationProp, AppStackScreenProps } from '../navigation';

const HeaderRight = (navigation: AppStackNavigationProp<'Home'>) => () => {
  return (
    <IconButton
      name="gearshape"
      size={32}
      onPress={() => {
        navigation.navigate('Settings');
      }}
    />
  );
};

export const Home = ({ navigation }: AppStackScreenProps<'Home'>) => {
  useHeader(
    {
      headerLargeTitle: true,
      headerMainTitle: ['홈', 'Home'],
      headerRight: HeaderRight(navigation),
      // useTransparent: true,
    },
    [navigation],
  );

  return (
    <ScrollableScreen padding pt={4}>
      <BorderedBox>
        <VStack space={1.5}>
          <Text font="headline" bold>
            View Recently Released Features
          </Text>
          <Text font="footnote" bold color="system.gray">
            234 people viewed this post
          </Text>
        </VStack>
      </BorderedBox>
      <Box h={4} />
      <Button title="Button" variant="filled" />
    </ScrollableScreen>
  );
};
