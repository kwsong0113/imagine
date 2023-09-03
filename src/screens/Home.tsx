import React from 'react';
import { Button, IconButton, ScrollableScreen } from '../components/ios';
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
    <ScrollableScreen padding>
      <Button title="Button" variant="filled" />
    </ScrollableScreen>
    // </VStackScreen>
  );
};
