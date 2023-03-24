import { HStack, VStack } from 'native-base';
import React from 'react';
import { Typography } from './Typography';

interface Props {
  left?: React.ReactNode;
  right?: React.ReactNode;
  title: string;
  description?: string;
  caption?: string;
  hasBottomBorder?: boolean;
}

export const ListRow = ({
  left,
  right,
  title,
  description,
  caption,
  hasBottomBorder = false,
}: Props) => {
  return (
    <HStack
      px={2}
      py={3}
      space={3}
      alignItems="center"
      borderColor="gray.300"
      borderTopWidth={1}
      borderBottomWidth={hasBottomBorder ? 1 : 0}
    >
      {left}
      <VStack flex={1} space={2}>
        <Typography variant="body">{title}</Typography>
        {description && (
          <Typography variant="description" color="gray.600">
            {description}
          </Typography>
        )}
        {caption && (
          <Typography variant="caption" color="gray.600">
            {caption}
          </Typography>
        )}
      </VStack>
      {right}
    </HStack>
  );
};
