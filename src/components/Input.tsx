import { FormControl, IInputProps, Input as NBInput, Text } from 'native-base';
import React, { useEffect } from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const AnimatedText = Animated.createAnimatedComponent(Text);

interface InputProps extends IInputProps {
  errorMessage?: string;
}

export function Input({
  errorMessage = undefined,
  isInvalid,
  value,
  placeholder,
  ...rest
}: InputProps) {
  const isInputInvalid = !!errorMessage || isInvalid;
  const isFilled = !!value && !errorMessage;

  const labelPositionY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const fontSizeAnimation = interpolate(
      labelPositionY.value,
      [20, -20],
      [16, 12],
      Extrapolate.CLAMP
    );

    return {
      top: labelPositionY.value,
      fontSize: fontSizeAnimation,
    };
  });

  useEffect(() => {
    labelPositionY.value = withSpring(value || isFilled ? -20 : 20, {});
  }, [value]);

  return (
    <FormControl marginY={4} isInvalid={isInputInvalid}>
      <AnimatedText
        position={'absolute'}
        color={'gray.400'}
        left={3}
        zIndex={1}
        style={animatedStyle}
      >
        {placeholder}
      </AnimatedText>
      <NBInput
        bg={'gray.100'}
        fontSize={'md'}
        h={16}
        isInvalid={isInputInvalid}
        borderWidth={1}
        borderColor={isFilled ? 'green.500' : 'gray.100'}
        _focus={{
          bg: 'gray.100',
          borderColor: 'gray.500',
        }}
        _invalid={{
          borderColor: 'red.500',
        }}
        value={value}
        placeholder={''}
        placeholderTextColor={'gray.400'}
        {...rest}
      />
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
}
