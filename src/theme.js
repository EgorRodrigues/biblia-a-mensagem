import { createMuiTheme } from '@material-ui/core';
import { useContext } from 'react';
import { BibleContext } from './contexts/BibleContext';

export function getTheme() {
  const { darkMode } = useContext(BibleContext)
  return darkMode
}

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#ffffff',
      main: '#ffffff',
      dark: '#cccccc',
      contrastText: '#000000'
    },
    secondary: {
      light: '#669eff',
      main: '#669eff',
      dark: '#0046be',
      contrastText: '#ffffff',
    },
  },
  typography: {
    h1: {
      fontSize: '4rem',
      fontWeight: 700
    },
    h2: {
      fontSize: '3rem',
      fontWeight: 700
    },
    h3: {
      fontSize: '2.5rem',
      fontWeight: 700
    },
    h4: {
      fontSize: '2rem',
      fontWeight: 500
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 500
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500
    },
  }
});

export const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      light: '#ffffff',
      main: '#ffffff',
      dark: '#cccccc',
      contrastText: '#000000'
    },
    secondary: {
      light: '#669eff',
      main: '#0070f2',
      dark: '#0046be',
      contrastText: '#ffffff',
    },
  },
  typography: {
    h1: {
      fontSize: '4rem',
      fontWeight: 700
    },
    h2: {
      fontSize: '3rem',
      fontWeight: 700
    },
    h3: {
      fontSize: '2.5rem',
      fontWeight: 700
    },
    h4: {
      fontSize: '2rem',
      fontWeight: 500
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 500
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500
    },
  }
});

