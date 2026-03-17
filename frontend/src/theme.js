import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#FF5200',
        },
        background: {
            default: '#ffffff',
        },
        text: {
            primary: '#3d4152',
            secondary: '#686b78',
        },
    },
    typography: {
        fontFamily: '"Roboto", sans-serif',
        fontWeightMedium: 600,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: '8px',
                },
            },
        },
    },
});

export default theme;