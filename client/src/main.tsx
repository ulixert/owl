import React from 'react';
import ReactDOM from 'react-dom/client';

import { theme } from '@/theme/index.ts';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <App />
    </MantineProvider>
  </React.StrictMode>,
);
