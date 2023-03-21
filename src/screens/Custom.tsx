import { Box, Text } from 'native-base';
import React from 'react';

export const Custom = () => {
  return (
    <Box flex="1" safeArea>
      <Box bg="orange.900">
        <Text fontSize="24px">안녕하세요</Text>
      </Box>
    </Box>
  );
};

export default Custom;
