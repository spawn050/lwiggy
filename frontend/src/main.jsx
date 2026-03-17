import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { Provider } from 'react-redux'
import store from './store/store.js'
import theme from './theme.js'
import App from './App.jsx'

async function enableMocking() {
    if (import.meta.env.DEV) {
        const { worker } = await import('./mocks/browser.js')
        return worker.start({ onUnhandledRequest: 'bypass' })
    }
}

enableMocking().then(() => {
    createRoot(document.getElementById('root')).render(
        <StrictMode>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <App />
                </ThemeProvider>
            </Provider>
        </StrictMode>,
    )
})