import { Feather } from '@expo/vector-icons';
import { IButtonProps, Button as NBButton, Text } from 'native-base';
import React, { useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const AnimatedButton = Animated.createAnimatedComponent(NBButton);
const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedFeather = Animated.createAnimatedComponent(Feather);

interface ButtonProps extends IButtonProps {
  title: string;
  isValidForm?: boolean;
}

export function Button({ title, isValidForm, ...rest }: ButtonProps) {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const width = useSharedValue(0);

  const widthAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: isValidForm ? width.value : width.value - 80,
      borderRadius: withSpring(isValidForm ? SCREEN_WIDTH / 8 : 5),
    };
  });

  const textAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isValidForm ? 0 : 1),
      transform: [{ translateX: withSpring(isValidForm ? -100 : 0) }],
    };
  });

  const arrowAnimationStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      opacity: withTiming(isValidForm ? 1 : 0),
      transform: [{ translateX: withSpring(isValidForm ? 5 : 100) }],
    };
  });

  useEffect(() => {
    width.value = withSpring(isValidForm ? SCREEN_WIDTH / 4 : SCREEN_WIDTH, {});
  }, [isValidForm]);

  return (
    <AnimatedButton
      h={16}
      bg={'green.700'}
      mt={8}
      _pressed={{ bg: 'green.800' }}
      alignSelf={'center'}
      {...rest}
      style={widthAnimatedStyle}
    >
      <AnimatedText
        color={'white'}
        fontSize={'md'}
        textTransform={'uppercase'}
        letterSpacing={1.5}
        fontWeight={'bold'}
        style={textAnimationStyle}
      >
        {title}
      </AnimatedText>
      <AnimatedFeather
        name="check"
        size={30}
        color={'#ffffff'}
        style={arrowAnimationStyle}
      />
    </AnimatedButton>
  );
}
