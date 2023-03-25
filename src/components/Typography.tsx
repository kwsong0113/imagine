import React, { ComponentProps, ReactNode } from 'react';
import { Text } from 'native-base';

type Variant =
  | 'title'
  | 'subtitle1'
  | 'subtitle2'
  | 'body'
  | 'description'
  | 'caption';

type TypographyProps = {
  variant: Variant;
  color?: string;
  truncate?: boolean;
  children?: ReactNode | string;
};

const typographyMap: Record<
  Variant,
  Pick<ComponentProps<typeof Text>, 'lineHeight' | 'fontSize'>
> = {
  title: {
    fontSize: '4xl',
    lineHeight: 30,
  },
  subtitle1: {
    fontSize: 'xl',
    lineHeight: 23,
  },
  subtitle2: {
    fontSize: 'lg',
    lineHeight: 21,
  },
  body: {
    fontSize: 'md',
    lineHeight: 18,
  },
  description: {
    fontSize: 'xs',
    lineHeight: 14,
  },
  caption: {
    fontSize: '2xs',
    lineHeight: 12,
  },
};

export const Typography = ({
  variant,
  color,
  truncate = false,
  children,
}: TypographyProps) => {
  return (
    <Text
      color={color ?? 'gray.900'}
      numberOfLines={truncate ? 1 : undefined}
      {...typographyMap[variant]}
    >
      {children}
    </Text>
  );
};
