import { HStack, useToken } from 'native-base';
import React from 'react';
import { Text, ScrollableScreen, List, Icon, Button } from '../components/ios';
import { useHeader } from '../hooks';
import { AppStackScreenProps } from '../navigation';

export const Settings = ({ navigation }: AppStackScreenProps<'Settings'>) => {
  const [system] = useToken('colors', ['system']);

  useHeader({
    headerLargeTitle: true,
    headerMainTitle: ['설정', 'Settings'],
    headerRightTitle: ['완료', 'Done'],
    onHeaderRightPress() {
      navigation.goBack();
    },
    useTransparent: true,
    headerStyle: {
      backgroundColor: system.secondaryBackground,
    },
  });

  return (
    <ScrollableScreen bg="system.secondaryBackground" pt={4}>
      <List
        bg="system.tertiaryBackground"
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]}
        header="About"
        footer="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        renderItem={() => (
          <HStack flex={1} justifyContent="space-between" alignItems="center">
            <Text font="body">Hello</Text>
            <Button size="small" title="Next" variant="tinted" />
          </HStack>
        )}
        renderLeft={() => <Icon name="gearshape" size={24} />}
        onItemPress={(index: number) => {
          return index === 1
            ? () => {
                navigation.navigate('Help');
              }
            : undefined;
        }}
      />
    </ScrollableScreen>
  );
};
