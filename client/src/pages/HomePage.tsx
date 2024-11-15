import { useNavigate } from 'react-router-dom';

import { Button, Title } from '@mantine/core';
import { useAuthStore } from '@stores/authStore.ts';

function HomePage() {
  // function handleClick() {
  //   fetch('/api/posts/feed')
  //     .then((res) => res.json())
  //     .then(console.log)
  //     .catch(console.error);
  // }

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  console.log('isAuthenticated', isAuthenticated);
  const navigate = useNavigate();

  return (
    <>
      <Title ta="center">Welcome to Owl App</Title>
      {isAuthenticated ? (
        <div>Your personalized feed goes here.</div>
      ) : (
        <div>
          <div>Hot posts for everyone to see.</div>
          <Button onClick={() => navigate('/login')}>
            Login to see your feed
          </Button>
        </div>
      )}
    </>
  );
}

export default HomePage;
