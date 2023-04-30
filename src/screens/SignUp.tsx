import { yupResolver } from '@hookform/resolvers/yup';
import { Center, Heading, ScrollView, VStack } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Button } from '../components/Button';
import { Input } from '../components/Input';

const schema = yup
  .object({
    name: yup.string().required('Name is required'),
    email: yup
      .string()
      .email('Please enter a valid email address')
      .required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    passwordConfirm: yup
      .string()
      .oneOf(
        [yup.ref('password')],
        'Password and password confirmation must match'
      )
      .required('Password confirmation is required'),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <VStack flex={1} bgColor={'gray.300'}>
      <Center mt={24} mb={12}>
        <Heading>SignUp</Heading>
      </Center>

      <ScrollView
        px={10}
        automaticallyAdjustKeyboardInsets
        keyboardShouldPersistTaps="never"
        showsVerticalScrollIndicator={false}
      >
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Name"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              errorMessage={errors.name?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              errorMessage={errors.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              secureTextEntry
              placeholder="Password"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              errorMessage={errors.password?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="passwordConfirm"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              secureTextEntry
              placeholder="Password confirmation"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              errorMessage={errors.passwordConfirm?.message}
            />
          )}
        />

        <Button title="Sign" onPress={handleSubmit(onSubmit)} />
      </ScrollView>
    </VStack>
  );
}
