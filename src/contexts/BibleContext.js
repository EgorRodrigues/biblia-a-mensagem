import { createContext, useState } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { darkTheme, lightTheme } from '../utils/theme'

export const BibleContext = createContext({ darkMode: false });

export function BibleProvider({children}) {
  
  let initialState = false;

  const [darkMode, setDarkMode] = useState(initialState)


  return (
    <BibleContext.Provider value={{
      darkMode,
      setDarkMode
    }}>
      <MuiThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          {children}
      </MuiThemeProvider>
    </BibleContext.Provider>
  )
}
