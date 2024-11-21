import React from 'react';

import { Stack } from '@mantine/core';

import classes from './PostMain.module.css';

type PostMainProps = {
  children: React.ReactNode;
  gap?: number;
};

export function PostMain({ children, gap = 8 }: PostMainProps) {
  return (
    <Stack gap={gap} className={classes.main}>
      {children}
    </Stack>
  );
}
