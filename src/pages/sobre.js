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
        <meta name="description" content="Saiba mais sobre o projeto Bíblia - A Mensagem online, separada por livros e capítulos. Versículos e mensagens bíblicas da palavra de Deus."/>
        <meta name="robots" content="follow" />
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
