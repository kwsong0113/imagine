import React from 'react';
import { TouchableOpacity } from 'react-native';
import { GearshapeIcon } from './GearShapeIcon';
import { IconProps, makeStyledIcon, StyledIconProps } from './makeStyledIcon';

type IconName = 'gearshape';

const iconMap: Record<IconName, (props: IconProps) => JSX.Element> = {
  gearshape: GearshapeIcon,
};

export type IconPropsWithName = StyledIconProps & {
  name: IconName;
};

export const Icon = ({ name, ...restProps }: IconPropsWithName) => {
  return makeStyledIcon(iconMap[name])(restProps);
};

export type IconButtonProps = IconPropsWithName & {
  onPress?: () => void;
};

export const IconButton = ({ onPress, ...iconProps }: IconButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon {...iconProps} />
    </TouchableOpacity>
  );
};
