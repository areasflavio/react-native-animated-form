import { IButtonProps, Button as NBButton, Text } from 'native-base';
import React from 'react';

interface ButtonProps extends IButtonProps {
  title: string;
}

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <NBButton
      w={'full'}
      h={16}
      bg={'green.700'}
      _pressed={{ bg: 'green.800' }}
      {...rest}
    >
      <Text color={'white'} fontSize={'md'}>
        {title}
      </Text>
    </NBButton>
  );
}
