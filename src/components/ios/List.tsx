import { Box, HStack, Pressable, VStack } from 'native-base';
import React, {
  ComponentProps,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { Text } from './Text';

interface ListItemProps {
  left?: ReactNode;
  children?: ReactNode;
  isTop: boolean;
  isBottom: boolean;
  onPress?: () => void;
}

const ListItem = ({
  left,
  children,
  isTop,
  isBottom,
  onPress,
}: ListItemProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [delayedIsPressed, setDelayedIsPressed] = useState(isPressed);

  useEffect(() => {
    const timer = setTimeout(
      () => setDelayedIsPressed(isPressed),
      isPressed ? 0 : 500,
    );

    return () => {
      clearTimeout(timer);
    };
  }, [isPressed]);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => {
        setIsPressed(true);
      }}
      onPressOut={() => {
        setIsPressed(false);
      }}
    >
      <HStack
        bg={
          delayedIsPressed && onPress ? 'system.opaqueSeperator' : 'transparent'
        }
        alignItems="center"
        borderTopWidth={isTop ? 0.2 : 0}
        borderBottomWidth={isBottom ? 0.2 : 0}
        borderColor="system.opaqueSeperator"
        mb={isBottom ? 0 : -0.2}
      >
        {left ? (
          <HStack pl={4} py={2} pr={3}>
            {left}
          </HStack>
        ) : (
          <HStack pl={4} />
        )}
        <HStack
          flex={1}
          alignItems="center"
          height="100%"
          py={3}
          pr={3}
          borderTopWidth={isTop ? 0 : 0.2}
          borderColor="system.opaqueSeperator"
        >
          {children}
        </HStack>
      </HStack>
    </Pressable>
  );
};

interface ListSectionProps<T> {
  bg?: ComponentProps<typeof VStack>['bg'];
  header?: string;
  footer?: string;
  data: Array<T>;
  renderLeft?: (info: { item: T; index: number }) => ReactElement;
  renderItem: (info: { item: T; index: number }) => ReactElement;
  onItemPress?: (index: number) => (() => void) | undefined;
}

export const List = function <T>({
  bg = 'system.background',
  header,
  footer,
  data,
  renderLeft,
  renderItem,
  onItemPress,
}: ListSectionProps<T>) {
  return (
    <VStack>
      {header && (
        <Box pl={4} pb={1}>
          <Text
            color="system.secondaryLabel"
            font="footnote"
            textTransform="uppercase"
          >
            {header}
          </Text>
        </Box>
      )}
      <VStack bg={bg}>
        {data.map((item, index) => {
          return (
            <ListItem
              key={index}
              left={renderLeft?.({ item, index })}
              isTop={index === 0}
              isBottom={index === data.length - 1}
              onPress={onItemPress?.(index)}
            >
              {renderItem({ item, index })}
            </ListItem>
          );
        })}
      </VStack>
      {footer && (
        <Box pl={4} pt={1}>
          <Text color="system.secondaryLabel" font="footnote">
            {footer}
          </Text>
        </Box>
      )}
    </VStack>
  );
};
