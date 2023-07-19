import React, { ComponentProps } from 'react';
import { Text as RNText } from 'native-base';

type Font =
  | 'largeTitle'
  | 'title1'
  | 'title2'
  | 'title3'
  | 'headline'
  | 'body'
  | 'callout'
  | 'subHeadline'
  | 'footnote'
  | 'caption1'
  | 'caption2';

const FONT_TO_TYPOGRAPHY_MAP: Record<
  Font,
  {
    fontWeight: number;
    fontSize: number;
    lineHeight: number;
    boldFontWeight: number;
  }
> = {
  largeTitle: {
    fontWeight: 400,
    fontSize: 34,
    lineHeight: 41,
    boldFontWeight: 700,
  },
  title1: {
    fontWeight: 400,
    fontSize: 28,
    lineHeight: 34,
    boldFontWeight: 700,
  },
  title2: {
    fontWeight: 400,
    fontSize: 22,
    lineHeight: 28,
    boldFontWeight: 700,
  },
  title3: {
    fontWeight: 400,
    fontSize: 20,
    lineHeight: 25,
    boldFontWeight: 700,
  },
  headline: {
    fontWeight: 600,
    fontSize: 17,
    lineHeight: 22,
    boldFontWeight: 600,
  },
  body: {
    fontWeight: 400,
    fontSize: 17,
    lineHeight: 22,

    boldFontWeight: 600,
  },
  callout: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 21,
    boldFontWeight: 600,
  },
  subHeadline: {
    fontWeight: 400,
    fontSize: 15,
    lineHeight: 20,
    boldFontWeight: 600,
  },
  footnote: {
    fontWeight: 400,
    fontSize: 13,
    lineHeight: 18,
    boldFontWeight: 600,
  },
  caption1: {
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 16,
    boldFontWeight: 500,
  },
  caption2: {
    fontWeight: 400,
    fontSize: 11,
    lineHeight: 13,
    boldFontWeight: 600,
  },
};

interface TextProps extends Omit<ComponentProps<typeof RNText>, 'font'> {
  font: Font;
  bold?: boolean;
}

export const Text = ({
  font,
  bold = false,
  color = 'system.label',
  ...restProps
}: TextProps) => {
  const { fontWeight, boldFontWeight, ...elseProps } =
    FONT_TO_TYPOGRAPHY_MAP[font];

  return (
    <RNText
      fontWeight={bold ? boldFontWeight : fontWeight}
      color={color}
      {...elseProps}
      {...restProps}
    />
  );
};
