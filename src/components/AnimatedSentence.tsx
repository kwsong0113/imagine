import React, { ComponentProps } from 'react';
import { HStack, Text } from 'native-base';
import { Animated } from 'react-native';

type Props = {
  content: string;
  duration: number;
} & Pick<ComponentProps<typeof Text>, 'fontSize' | 'color' | 'fontWeight'>;

const AnimatedText = Animated.createAnimatedComponent(Text);

export class AnimatedSentence extends React.Component<Props, {}> {
  animatedValues: Animated.Value[] = [];
  textArr: string[] = [];

  constructor(props: Props) {
    super(props);
    const textArr = props.content.trim().split('');
    this.animatedValues = textArr.map(() => new Animated.Value(0));
    this.textArr = textArr;
  }

  componentDidMount(): void {
    this.animated();
  }

  animated = (toValue = 1) => {
    const animations = this.textArr.map((_, i) => {
      return Animated.timing(this.animatedValues[i], {
        toValue,
        duration: this.props.duration,
        useNativeDriver: true,
      });
    });

    Animated.stagger(this.props.duration / 5, animations).start();
  };

  render() {
    return (
      <HStack>
        {this.textArr.map((word, index) => {
          return (
            <AnimatedText
              key={`${word}-${index}`}
              fontSize={this.props.fontSize}
              fontWeight={this.props.fontWeight}
              color={this.props.color}
              style={[
                {
                  opacity: this.animatedValues[index],
                  transform: [
                    {
                      translateY: Animated.multiply(
                        this.animatedValues[index],
                        new Animated.Value(-5),
                      ),
                    },
                  ],
                },
              ]}
            >
              {word}
            </AnimatedText>
          );
        })}
      </HStack>
    );
  }
}
