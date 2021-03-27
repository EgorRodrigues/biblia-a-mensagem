import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/globals.css'
import { BibleProvider } from '../contexts/BibleContext';

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
