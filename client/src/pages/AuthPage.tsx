import { ForgotPassword } from '@/features/auth/ForgotPassword/ForgotPassword.tsx';
import { Login } from '@/features/auth/Login/Login.tsx';
import { Signup } from '@/features/auth/SignUp/SignUp.tsx';
import { Container } from '@mantine/core';
import { useAuthViewStore } from '@stores/useAuthViewStore.ts';

export function AuthPage() {
  const { currentView } = useAuthViewStore();

  return (
    <Container size={420} my={40}>
      {currentView === 'login' && <Login />}
      {currentView === 'signup' && <Signup />}
      {currentView === 'forgot-password' && <ForgotPassword />}
    </Container>
  );
}

export default AuthPage;
