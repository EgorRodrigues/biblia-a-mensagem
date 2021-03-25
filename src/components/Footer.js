import { Paper } from '@material-ui/core';
import { useContext } from 'react';
import { BibleContext } from '../contexts/BibleContext';
import styles from '../styles/pages/Footer.module.css'

export default function Footer() {
  const { darkMode } = useContext(BibleContext);

  return (
    <Paper elevation={0} className={darkMode ? styles.rootDark : styles.root}>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Em construção
        </a>
      </footer>
    </Paper>
  )
}