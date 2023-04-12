import React, { ComponentProps, ReactNode } from 'react';
import { Text } from 'native-base';

type Variant =
  | 'title'
  | 'subtitle1'
  | 'subtitle2'
  | 'body'
  | 'info'
  | 'description'
  | 'caption';

type TypographyProps = {
  variant: Variant;
  color?: string;
  isTruncated?: boolean;
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
  info: {
    fontSize: 'sm',
    lineHeight: 16,
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
  isTruncated = false,
  children,
}: TypographyProps) => {
  return (
    <Text
      color={color ?? 'gray.900'}
      isTruncated={isTruncated}
      {...typographyMap[variant]}
    >
      {children}
    </Text>
  );
};
