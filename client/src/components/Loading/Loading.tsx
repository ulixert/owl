import { Box, LoadingOverlay } from '@mantine/core';

export function Loading() {
  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={true}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'yellow', type: 'bars' }}
      />
    </Box>
  );
}
