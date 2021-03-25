import { Fab, makeStyles, Paper, Typography, Zoom } from '@material-ui/core';
import Head from 'next/head';
import BibleBooksNames from '../../../../public/assets/the-message-the-bible-books.json'
import Bible from '../../../../public/assets/the-message-the-bible-ptbr.json'
import styles from '../../../styles/pages/[chapter].module.css'
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Link from 'next/link';
import { useContext, useState } from 'react';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import CopySnackbar from '../../../components/CopySnackbar';
import { BibleContext } from '../../../contexts/BibleContext';

// https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
function removeDiacritics(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
};

function formatBookName(str) {
  return removeDiacritics(str).replace(" ", "").toLowerCase()
}

// This function gets called at build time
export async function getStaticPaths() {

  const books = Bible.books;
  const paths = [];
  
  books.forEach((book, idx) => {
    book.chapters.forEach((chapter, chapterIdx) => {
      paths.push({
        params: {
          bookName: formatBookName(book.name),
          chapter: String(chapterIdx+1)
        }
      })
    });
  });

  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This also gets called at build time
export async function getStaticProps(context) {
  const bookName = context.params.bookName
  const chapter = context.params.chapter
  return {
    props: {
      bookName: bookName,
      chapter: chapter
    }
  }
}

export default function Book(props) {
  const { darkMode } = useContext(BibleContext);
  const bookNameProps = props.bookName;
  const chapter = Number(props.chapter);
  let bookContentJson;
  let bookName;
  let amountOfChapters;
  let verses = [];
  let prevChapterHref = '';

  const [nextChapter, setNextChapter] = useState(null);
  const [prevChapter, setPrevChapter] = useState(null);
  
  Bible.books.forEach(book => {
    if (formatBookName(book.name) === bookNameProps) {
      bookContentJson = book.chapters[chapter - 1].verses
    }
  })
  
  BibleBooksNames.forEach(book => {
    if (formatBookName(book.title) === bookNameProps) {
      bookName = book.title;
      amountOfChapters = Number(book.chapters)
      
    }
  });

  bookContentJson.forEach((verse, idx) => {
    if (verse.title === '') {
      verses.push(
        <div className={styles.verse} key={idx}>
          <Typography variant="subtitle2" className={styles.verseAux}>{verse.aux}</Typography>
          <Typography variant="body1" className={styles.test}>
            <sup className={styles.sup}>{verse.number}</sup>
            {verse.content}
            <CopySnackbar
              content={`${verse.content} ${bookName} ${chapter}:${verse.number}`}
              className={styles.copySnackbar}
            />
          </Typography>
        </div>
      )
    } else {
      verses.push(
        <div className={styles.verse} key={idx}>
          <Typography variant="subtitle2" className={styles.verseAux}>{verse.aux}</Typography>
          <Typography variant="h6">{verse.title}</Typography>
          <Typography variant="body1">
            <sup className={styles.sup}>{verse.number}</sup>
            {verse.content}
            <CopySnackbar
              content={`${verse.content} ${bookName} ${chapter}:${verse.number}`}
              className={styles.copySnackbar}
            />
          </Typography>
  
        </div>
      )
    }
  })

  
  const nextChapterExists = () => {
    if (chapter < amountOfChapters) {
      // console.log(true)
      return true
    } else {
      // console.log(false)
      return false
    }
  }

  const prevChapterExists = () => {
    chapter > 1 ? true : false
  }

  const getNextChapterHref = () => {
    if (nextChapterExists()) {
      return `/livro/${formatBookName(bookName)}/${chapter}`
    } else {
      return ''
    }
  }

  const getPrevChapterHref = () => {
    if (prevChapterExists()) {
      return `/livro/${formatBookName(bookName)}/${chapter}`
    } else {
      return ''
    }
  }

  function ScrollTopButton(props) {
    const { children, window } = props;
    // const classes = scrolTopStyles();
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
      disableHysteresis: true,
      threshold: 100,
    });
  
    const handleClick = (event) => {
      const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');
  
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };
  
    return (
      <Zoom in={trigger}>
        <div onClick={handleClick} role="presentation" className={styles.scrollTopButton}>
          {children}
        </div>
      </Zoom>
    );
  }
  
  function NextChapterButton(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
      disableHysteresis: true,
      threshold: 100,
    });
  
    const handleClick = (event) => {
      const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');
  
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };
  
    return (
      <Link href={nextChapterExists() ? `/livro/${formatBookName(bookName)}/${chapter + 1}` : `/livro/${formatBookName(bookName)}/${chapter}`}>
        <Zoom in={trigger}>
          <div onClick={handleClick} role="presentation" className={styles.nextChapterButton}>
            {children}
          </div>
        </Zoom>
      </Link>
    );
  }

  return(
    <Paper elevation={0} className={darkMode ? styles.rootDark : styles.root}>
      <Head>
        <title>{bookName} {chapter} | Bíblia - A Mensagem</title>
      </Head>

      <div className={styles.container}>
        <main className={styles.content}>
          <div className={styles.title}>
            <Typography variant="h4" component="h1" id="back-to-top-anchor">{bookName}</Typography>
            <Typography variant="h6" className={styles.chapterName}>Capítulo: {chapter}</Typography>
          </div>

          {verses}

          <ScrollTopButton {...props}>
            <Fab
              color="secondary"
              size="small"
              aria-label="Retornar para o topo da página"
              title="Retornar para o topo da página"
              alt="Próximo capítulo" 
              className={styles.scrollButton}
            >
              <KeyboardArrowUpIcon color="inherit"/>
            </Fab>
          </ScrollTopButton>

          <NextChapterButton {...props}>
            <Fab
              color="secondary"
              size="small"
              aria-label="Próximo capítulo"
              title="Próximo capítulo"
              alt="Próximo capítulo" 
            >
              <KeyboardArrowRightIcon color="inherit"/>
            </Fab>
          </NextChapterButton>
        </main>
      </div>

    </Paper>
  )
}