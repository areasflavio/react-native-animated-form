import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';

import { SignUp } from './src/screens/SignUp';

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar style="auto" />
      <SignUp />
    </NativeBaseProvider>
  );
}
