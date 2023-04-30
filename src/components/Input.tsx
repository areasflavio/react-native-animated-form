import { FormControl, IInputProps, Input as NBInput } from 'native-base';
import React from 'react';

interface InputProps extends IInputProps {
  errorMessage?: string;
}

export function Input({
  errorMessage = undefined,
  isInvalid,
  value,
  ...rest
}: InputProps) {
  const isInputInvalid = !!errorMessage || isInvalid;
  const isFilled = !!value && !errorMessage;

  return (
    <FormControl mb={4} isInvalid={isInputInvalid}>
      <NBInput
        bg={'gray.100'}
        fontSize={'md'}
        h={16}
        isInvalid={isInputInvalid}
        borderWidth={1}
        borderColor={isFilled ? 'green.500' : 'gray.100'}
        _focus={{
          bg: 'gray.200',
          borderColor: 'green.500',
        }}
        _invalid={{
          borderColor: 'red.500',
        }}
        value={value}
        {...rest}
      />
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
}
