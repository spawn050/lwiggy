import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#fe5300',
        },
        secondary: {
            main: '#1b2124'
        },
        background: {
            default: '#fefeff',
            paper: '#fefeff',
        },
        text: {
            primary: '#1b2124',
            secondary: '#1a2025',
        },
    },
    typography: {
        fontFamily: 'sans-serif',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 8,
                },
            },
        },
    },
});