import { Button, Paper, Typography } from '@material-ui/core';
import Head from 'next/head';
import Link from 'next/link';
import { useContext } from 'react';
import BibleBooksNames from '../../../public/assets/the-message-the-bible-books.json'
import ChaptersList from '../../components/ChaptersList';
import { BibleContext } from '../../contexts/BibleContext';
import styles from '../../styles/pages/[bookName].module.css'

// https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
function removeDiacritics(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
};

function formatBookName(str) {
  return removeDiacritics(str).replace(" ", "").toLowerCase()
}

function getBibleBooksPaths() {

  // Get the paths we want to pre-render based on bible books
  const paths = BibleBooksNames.map((book) => {
    return { params: { bookName: formatBookName(book.title) } }
  })

  return(paths)
}

// This function gets called at build time
export async function getStaticPaths() {
  const paths = getBibleBooksPaths()

  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This also gets called at build time
export async function getStaticProps(context) {
  const bookName = context.params.bookName
  return {
    props: {
      bookName: bookName
    }
  }
}

export default function Book(props) {
  const { darkMode } = useContext(BibleContext);

  const bookNameProps = props.bookName;
  let bookName;
  let chapters;
  let bookChapterHeader;
  const items = [];
  
  BibleBooksNames.forEach(book => {
    if (formatBookName(book.title) === bookNameProps) {
      bookName = book.title;
      chapters = Number(book.chapters);
    }
  });

  // Generates a card for each chapter
  for (let i = 1; i < chapters + 1; i++) {
    items.push(
      <Link href={`/livro/${formatBookName(bookName)}/${i}`} key={i}>
        <Button
          color="primary.dark"
          variant="outlined"
          size="large"
          className={darkMode ? styles.cardDark : styles.card}
        >
          <Typography variant="h6">
            {i}
          </Typography>
        </Button>
      </Link>
    )  
  }

  if (chapters === 1) {
    bookChapterHeader = <h5>{chapters} capítulo</h5>
  } else {
    bookChapterHeader = <h5>{chapters} capítulos</h5>
  }
  
  return(
    <Paper elevation={0} className={darkMode ? styles.rootDark : styles.root}>
      <Head>
        <title>{bookName} | Bíblia - A Mensagem</title>
      </Head>
      <div className={styles.container}>
        <h3>{bookName}</h3>
        {bookChapterHeader}
        <div className={styles.bookNameGrid}>
          {items}
        </div>
      </div>
    </Paper>
  )
}