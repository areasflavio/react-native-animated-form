import { Center, Heading, VStack } from 'native-base';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export function SignUp() {
  return (
    <VStack flex={1} bgColor={'gray.300'} px={10}>
      <Center>
        <Heading my={24}>SignUp</Heading>

        <Input placeholder="Name" />
        <Input placeholder="Email" />
        <Input placeholder="Password" />
        <Input placeholder="Confirm Password" />

        <Button title="Confirm" />
      </Center>
    </VStack>
  );
}
