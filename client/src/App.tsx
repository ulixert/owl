import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Loading } from '@/components/Loading/Loading.tsx';
import { ProtectedRoute } from '@/components/ProtectedRoute/ProtectedRoute.tsx';
import { ForgotPassword } from '@/features/auth/components/ForgotPassword/ForgotPassword.tsx';
import { Login } from '@/features/auth/components/Login/Login.tsx';
import { Signup } from '@/features/auth/components/SignUp/SignUp.tsx';
import { PostList } from '@/features/posts/PostList/PostList.tsx';
import { useAccessToken } from '@/hooks/useAccessToken.ts';
import AuthPage from '@/pages/AuthPage.tsx';
import HomePage from '@/pages/HomePage.tsx';
import NotFoundPage from '@/pages/NotFoundPage.tsx';
import PostPage from '@/pages/PostPage.tsx';
import { Layout } from '@layouts/Layout/Layout.tsx';
import { useAuthStore } from '@stores/authStore.ts';

function App() {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const { isPending, isError } = useAccessToken();

  useEffect(() => {
    if (isError) {
      setAccessToken(null);
    }
  }, [isError, setAccessToken]);

  if (isPending) {
    return <Loading />;
  }

  return (
    <BrowserRouter
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
    >
      <Layout>
        <Routes>
          {/* Home Page Route */}
          <Route path="/" element={<HomePage />} />

          <Route path="/hot" element={<PostList />} />
          <Route
            path="/for-you"
            element={
              <ProtectedRoute>
                <PostList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/following"
            element={
              <ProtectedRoute>
                <PostList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/liked"
            element={
              <ProtectedRoute>
                <PostList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved"
            element={
              <ProtectedRoute>
                <PostList />
              </ProtectedRoute>
            }
          />

          {/* Auth Routes using Nested Routing */}
          <Route path="/" element={<AuthPage />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* User Routes */}
          {/*<Route path=":username" element={<UserPage />} />*/}
          <Route path="/posts/:postId" element={<PostPage />} />

          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
