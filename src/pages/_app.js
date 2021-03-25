import React, { useContext, useState } from 'react';
import { Button, createMuiTheme, MuiThemeProvider, Paper, Switch } from '@material-ui/core';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/globals.css'
import { BibleContext, BibleProvider } from '../contexts/BibleContext';
import { getTheme } from '../theme'

function MyApp({ Component, pageProps }) {

  return (
    <BibleProvider>
      <Header/>

      <Component {...pageProps} />

      <Footer />
    </BibleProvider>
  )
}

export default MyApp
