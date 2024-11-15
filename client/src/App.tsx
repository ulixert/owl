import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Header } from '@/components/Header/Header.tsx';
import { ForgotPassword } from '@/features/auth/ForgotPassword/ForgotPassword.tsx';
import { Login } from '@/features/auth/Login/Login.tsx';
import { Signup } from '@/features/auth/SignUp/SignUp.tsx';
import AuthPage from '@/pages/AuthPage.tsx';
import HomePage from '@/pages/HomePage.tsx';
import PostPage from '@/pages/PostPage.tsx';
import UserPage from '@/pages/UserPage.tsx';
import { Container } from '@mantine/core';

function App() {
  return (
    <BrowserRouter
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
    >
      <Container size={620}>
        <Header />
        <Routes>
          {/* Home Page Route */}
          <Route path="/" element={<HomePage />} />

          {/* Auth Routes using Nested Routing */}
          <Route path="/" element={<AuthPage />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* User Routes */}
          <Route path=":username" element={<UserPage />} />
          <Route path=":username/post/:pid" element={<PostPage />} />

          {/* 404 Route */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
