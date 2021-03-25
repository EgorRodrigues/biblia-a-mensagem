import { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { MuiThemeProvider, Paper } from '@material-ui/core';
import { darkTheme, lightTheme } from '../theme'

export const BibleContext = createContext({ darkMode: false });

export function BibleProvider({children}) {
  
  let initialState = false;

  const [darkMode, setDarkMode] = useState(initialState)


  return (
    <BibleContext.Provider value={{
      darkMode,
      setDarkMode,
      mainBgColor: "#181818",
      secondaryBgColor: "#202020",
      lightBgColor:  '#fafafa'
    }}>
      <MuiThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          {children}
      </MuiThemeProvider>
    </BibleContext.Provider>
  )
}
