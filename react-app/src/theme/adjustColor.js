import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#b2e9dd',
            light: 'rgba(198,229,252,0.94)',
            dark: 'rgba(165,231,231,0.99)',
            contrastText: '#000',
        },
        secondary: {
            main: '#a90707',
            light: '#f7f7f7',
            dark: '#f7f7f7',
            contrastText: '#000',
        }
    },
});

export default theme;