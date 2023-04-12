import { Center, Box, useTheme } from 'native-base';
import React from 'react';
import Svg, { Circle } from 'react-native-svg';
import { Typography } from './Typography';

interface Props {
  progress: number;
  total: number;
}

const Radius = 12;
const Length = 2 * Math.PI * Radius;

export const ProgressIcon = ({ progress, total }: Props) => {
  const { colors } = useTheme();
  return (
    <Center>
      <Svg width={32} height={32} transform={[{ rotate: '-90deg' }]}>
        <Circle
          cx={17}
          cy={15}
          r={Radius}
          fill="none"
          stroke={colors.gray[400]}
          strokeWidth={2}
        />
        <Circle
          cx={17}
          cy={15}
          r={Radius}
          fill="none"
          stroke={progress === total ? colors.blue[500] : colors.teal[700]}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={Length}
          strokeDashoffset={Length - Length * (progress / total)}
          strokeWidth={2}
        />
      </Svg>
      <Box position="absolute" pr={0.5} pb={0.5}>
        <Typography
          variant="info"
          color={progress === total ? 'blue.500' : 'teal.700'}
        >
          {progress}
        </Typography>
      </Box>
    </Center>
  );
};
