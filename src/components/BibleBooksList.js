// import BibleData from '../../public/assets/the-message-the-bible-ptbr.json'
import styles from '../styles/pages/BibleBooksList.module.css'
import Link from 'next/link'
import BibleBooks from '../../public/assets/the-message-the-bible-books.json'
import OldTestamentBooks from '../../public/assets/the-message-the-bible-old-testament-books.json'
import NewTestamentBooks from '../../public/assets/the-message-the-bible-new-testament-books.json'
import { useContext, useState } from 'react';
import { Button, Paper, TextField, Typography, useControlled } from '@material-ui/core';
import { BibleContext } from '../contexts/BibleContext';


function removeDiacritics(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
};

function formatBookName(str) {
  return removeDiacritics(str).replace(" ", "").toLowerCase()
}

export default function BibleBooksList() {
  const { darkMode } = useContext(BibleContext)

  const booksList = [];
  const oldTestamentList = [];
  const newTestamentList = [];
  let foundNewTestament = false;

  BibleBooks.forEach(book => {
    booksList.push(book.title) 
    if (book.title === 'Mateus') {
      foundNewTestament = true;
    }
    if (foundNewTestament) {
      newTestamentList.push(book.title)
    } else {
      oldTestamentList.push(book.title)
    }
  });

  const [autocompleteOldTestamentBooks, setAutocompleteOldTestamentBooks] = useState([])
  const [autocompleteNewTestamentBooks, setAutocompleteNewTestamentBooks] = useState([])
  const [autocompleteFocused, setAutocompleteFocus] = useState(false);

  function matchBooks(input, testament) {
    var formattedInput = formatBookName(input)
    if (testament === 'new') {
      return newTestamentList.filter(function(book) {
        if (formatBookName(book).includes(formattedInput)) {
          return book;
        }
      });
    } else if (testament === 'old') {
      return oldTestamentList.filter(function(book) {
        if (formatBookName(book).includes(formattedInput)) {
          return book;
        }
      });
    }
  }

  function changeBooksCards(input) {
    let oldTestamentResult = matchBooks(input, 'old');
    let newTestamentResult = matchBooks(input, 'new');
    setAutocompleteOldTestamentBooks(oldTestamentResult)
    setAutocompleteNewTestamentBooks(newTestamentResult)
  }

  const isEmptyString = (string) => {
    string = string.replace(/\s/g, '');
    return string === '' ? true : false;
  }

  function changeAutocompleteFocus(value) {
    if (isEmptyString(value)) {
      setAutocompleteFocus(false);
    } else {
      setAutocompleteFocus(true);
    }
  }

  return (
    <div className={styles.container}>
      <TextField
        id="outlined-basic"
        label="Pesquise um livro"
        variant="outlined"
        color="secondary"
        className={styles.autocomplete}
        onChange={(event, value = event.target.value) => {changeBooksCards(value); changeAutocompleteFocus(value);}}
      />
      
      <div className={styles.grid}>
        <div className={styles.booksSection}>
          <Typography variant='h5'>Antigo Testamento</Typography>
          { autocompleteFocused ? (
            
            autocompleteOldTestamentBooks.map((book) => {
              return (
                <Link href={`/livro/${formatBookName(book)}`} key={book}>
                  <Button
                    color="primary.dark"
                    variant="outlined"
                    size="large"
                    className={darkMode ? styles.cardDark : styles.card}
                  >
                    {book}
                  </Button>
                </Link>
              )}
            )
            
            ) : (

            OldTestamentBooks.map((book) => {
              return (
                <Link href={`/livro/${formatBookName(book.title)}`} key={book.title}>
                  <Button
                    color="primary.dark"
                    variant="outlined"
                    size="large"
                    className={darkMode ? styles.cardDark : styles.card}
                  >
                    {book.title}
                  </Button>
                </Link>
              )}
            )
          )
          }

          { autocompleteFocused && autocompleteOldTestamentBooks.length === 0 &&
            <div className={darkMode ? styles.cardDark : styles.card}>Nenhum livro encontrado</div>
          }
        </div>
        <div className={styles.booksSection}>
          <Typography variant='h5'>Novo Testamento</Typography>
          { autocompleteFocused ? (
            
            autocompleteNewTestamentBooks.map((book) => {
              return (
                <Link href={`/livro/${formatBookName(book)}`} key={book}>
                  <Button
                    color="primary.dark"
                    variant="outlined"
                    size="large"
                    className={darkMode ? styles.cardDark : styles.card}
                  >
                    {book}
                  </Button>
                </Link>
              )
            })
            
            ) : (

            NewTestamentBooks.map((book) => {
              return (
                <Link href={`/livro/${formatBookName(book.title)}`} key={book.title}>
                  <Button
                    color="primary.dark"
                    variant="outlined"
                    size="large"
                    className={darkMode ? styles.cardDark : styles.card}
                  >
                    {book.title}
                  </Button>
                </Link>
              )
            })
          )
          }

          { autocompleteFocused && autocompleteNewTestamentBooks.length === 0 &&
            <div className={darkMode ? styles.cardDark : styles.card}>Nenhum livro encontrado</div>
          }
        </div>
      </div>
      </div>
  );
}