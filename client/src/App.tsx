import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Header } from '@/components/Header/Header.tsx';
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
          <Route path="/" element={<HomePage />} />

          {/* Auth routes */}
          <Route path={'/login'} element={<AuthPage />} />
          <Route path={'/signup'} element={<AuthPage />} />
          <Route path={'/forgot-password'} element={<AuthPage />} />
          {/* User routes */}
          <Route path="/:usersname" element={<UserPage />} />
          <Route path="/:usersname/post/:pid" element={<PostPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
