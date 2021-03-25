import Head from 'next/head'
import styles from '../styles/pages/Sobre.module.css'
import Link from 'next/link'
import { Paper, Typography } from '@material-ui/core';
import { BibleContext } from '../contexts/BibleContext';
import { useContext } from 'react';

export default function Sobre() {
  
  const { darkMode } = useContext(BibleContext);

  return (
    <div className={styles.container}>
      
      <Head>
        <title>Sobre | Bíblia - A Mensagem</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Paper elevation={0} className={darkMode ? styles.rootDark : styles.root}>
        <main className={styles.main}>
          <Typography variant="h1">
            Em Construção
          </Typography>
        </main>
      </Paper>
    
    </div>
  )
}
