import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { setupWorker } from 'msw/browser';
import App from './App'
import { mockHandlers } from './msw/MockHandlers';

const IS_TEST_MODE: boolean = true;
const mswWorker = setupWorker(...mockHandlers);

if (IS_TEST_MODE) {
  mswWorker.start().then(() => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  });
} else {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}
