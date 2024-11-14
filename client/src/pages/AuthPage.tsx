import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ForgotPassword } from '@/features/auth/ForgotPassword/ForgotPassword.tsx';
import { Login } from '@/features/auth/Login/Login.tsx';
import { Signup } from '@/features/auth/SignUp/SignUp.tsx';

type View = 'login' | 'signup' | 'forgot-password';

export function AuthPage() {
  const navigate = useNavigate();
  const [view, isView] = useState<View>('login');

  function handleViewChange(newView: View) {
    isView(newView);
    navigate(`/${newView}`);
  }

  return (
    <>
      {view === 'login' && (
        <Login
          onSignupClick={() => handleViewChange('signup')}
          onForgotPasswordClick={() => handleViewChange('forgot-password')}
        />
      )}
      {view === 'signup' && (
        <Signup onLoginClick={() => handleViewChange('login')} />
      )}
      {view === 'forgot-password' && (
        <ForgotPassword onBackToLoginClick={() => handleViewChange('login')} />
      )}
    </>
  );
}

export default AuthPage;
