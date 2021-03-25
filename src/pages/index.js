import Head from 'next/head';
import styles from '../styles/pages/Home.module.css';
import BibleBooksList from '../components/BibleBooksList';
import { Paper, Typography } from '@material-ui/core';
import { useContext } from 'react';
import { BibleContext } from '../contexts/BibleContext';

function Home() {

  const { darkMode } = useContext(BibleContext);

  return (
    <Paper elevation={0} className={darkMode ? styles.rootDark : styles.root}>
      <Head>
        <title>Bíblia - A Mensagem</title>
      </Head>
      
      <div >
        <main className={styles.main}>
          <Typography variant="h1">Bíblia - A Mensagem</Typography>
          <BibleBooksList />
        </main>

      </div>
    </Paper>
  )
}

export default Home