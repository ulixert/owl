import { Link } from 'react-router-dom';

import { Button, Flex } from '@mantine/core';

function HomePage() {
  function handleClick() {
    fetch('/api/posts')
      .then((res) => res.json())
      .then(console.log)
      .catch(console.error);
  }

  return (
    <>
      <Link to={'/matt'}>
        <Flex w={'100%'} align="center" justify="center">
          <Button mx={'auto'}>Go to Profile Page</Button>
        </Flex>
      </Link>
      <button onClick={handleClick}>click here</button>
    </>
  );
}

export default HomePage;
