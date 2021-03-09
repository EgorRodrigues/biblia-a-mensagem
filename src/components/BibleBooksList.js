import BibleData from '../../the-message-the-bible-ptbr.json'
import styles from '../styles/pages/BibleBooksList.module.css'
import Link from 'next/link'

export default function BibleBooksList() {
  const bible = BibleData.books;
  const oldTestamentBooks = [];
  const newTestamentBooks = [];

  let newTestament = false;

  bible.forEach(book => {
    if (book.name == 'Mateus') {
      newTestament = true;
    }
    if (newTestament) {
      newTestamentBooks.push(book.name);
    } else {
      oldTestamentBooks.push(book.name);
    }
  });

  return (
    <div className={styles.grid}>
      <div className={styles.booksSection}>
        <h3 className={styles.titleH3}>Antigo Testamento</h3>
        {
          oldTestamentBooks.map((bookName) => {
            return (
              <Link href="/sobre" key={bookName}>
                <a className={styles.card}>
                  <p>{bookName}</p>
                </a>
              </Link>
            )
          })
        }
      </div>
      <div className={styles.booksSection}>
        <h3 className={styles.titleH3}>Novo Testamento</h3>
        {
          newTestamentBooks.map((bookName) => {
            return (
              <Link href="/sobre" key={bookName}>
                <a className={styles.card}>
                  <p>{bookName}</p>
                </a>
              </Link>
            )
          })
        }
      </div>
    </div>
  );
}