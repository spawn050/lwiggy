import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { setupWorker } from 'msw/browser';
import App from './App'
import { mockHandlers } from './msw/MockHandlers';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';

const IS_TEST_MODE: boolean = true;
const mswWorker = setupWorker(...mockHandlers);

function createRootElement() {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ThemeProvider theme = {theme}>
        <App />
      </ThemeProvider>
    </StrictMode>
  );
}

if (IS_TEST_MODE) {
  mswWorker.start().then(() => {
    createRootElement();
  });
} else {
  createRootElement();
}
