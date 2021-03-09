import BibleBooks from '../../../the-message-the-bible-books.json'

// https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
function removeDiacritics(char) {
  return char.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
};

function getBibleBooksPaths() {
  const books = BibleBooks.books

  // Get the paths we want to pre-render based on bible books
  const paths = books.map((bookName) => {
    return { params: { livro: bookName.replace(" ", "") } }
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
  const book = context.params.livro
  return {
    props: {
      book: book
    }
  }
}

export default function Book(props) {
  return(
    <div>Livro {props.book}</div>
  )
}