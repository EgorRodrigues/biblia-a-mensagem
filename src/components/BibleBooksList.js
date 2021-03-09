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
          oldTestamentBooks.map((bookName, idx) => {
            return (
              <Link href="/sobre">
                <a className={styles.card} key={idx}>
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
          newTestamentBooks.map((bookName, idx) => {
            return (
              <Link href="/sobre">
                <a className={styles.card} key={idx}>
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