import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PostPage from '@/pages/PostPage.tsx';
import UserPage from '@/pages/UserPage.tsx';
import { Container } from '@mantine/core';

function App() {
  return (
    <BrowserRouter>
      <Container size={620}>
        <Routes>
          <Route path="/:usersname" element={<UserPage />} />
          <Route path="/:usersname/post/:pid" element={<PostPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
