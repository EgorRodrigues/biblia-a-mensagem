import Head from 'next/head'
import styles from '../../styles/pages/Api.module.css'
import Link from 'next/link'
import { Paper, Typography } from '@material-ui/core';
import { useContext } from 'react';
import { BibleContext } from '../../contexts/BibleContext';

export default function Api() {

  const { darkMode } = useContext(BibleContext);

  return (
    <div className={styles.container}>
      
      <Head>
        <title>API | Bíblia - A Mensagem</title>
        <meta name="description" content="Aprenda a utilizar nossa API com a documentação da Bíblia - A Mensagem online, separada por livros e capítulos."/>
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
