import React from 'react';
import { Image } from 'native-base';
import { useColorModeValue } from '../hooks';

interface Props {
  name: string;
  base64: string;
}

export const GesturePreview = ({ name, base64 }: Props) => {
  const borderColor = useColorModeValue('gray.300', 'gray.200');

  return (
    <Image
      alt={name}
      width={8}
      height={10}
      borderWidth={1}
      borderColor={borderColor}
      borderRadius={8}
      source={{
        uri: `data:image/png;base64,${base64}`,
      }}
      resizeMode="contain"
    />
  );
};
