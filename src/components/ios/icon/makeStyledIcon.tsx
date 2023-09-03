import React from 'react';
import { useToken } from 'native-base';
import { SvgProps } from 'react-native-svg';

export type StyledIconProps = {
  size: number;
  color?: string;
} & SvgProps;

export type IconProps = {
  color: string;
} & SvgProps;

export const makeStyledIcon = (Icon: (props: IconProps) => JSX.Element) => {
  return ({ size, color, ...restProps }: StyledIconProps) => {
    const iconColor = useToken('colors', color ?? 'system.blue');

    return <Icon width={size} height={size} color={iconColor} {...restProps} />;
  };
};
