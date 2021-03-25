// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import BibleData from '../../../../public/assets/the-message-the-bible-ptbr.json'

interface BibleData {
  books?: (BooksEntity)[] | null;
}
interface BooksEntity {
  name: string;
  chapters?: (ChaptersEntity)[] | null;
}
interface ChaptersEntity {
  chapter: string;
  verses?: (VersesEntity)[] | null;
}
interface VersesEntity {
  title: string;
  aux: string;
  number: string;
  content: string;
}

function removeDiacritics(str: any) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

function formatBookName(str) {
  return removeDiacritics(str).replace(" ", "").toLowerCase()
}


export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).json({message: 'Desculpe, só aceitamos solicitações GET'});
  } else {
    const rawBookName = req.query.bookName
    const bookName = formatBookName(rawBookName);
    const books = BibleData['books'];
    let bookIndex : undefined | number;
    let originalBookName : string;
  
    books.forEach((book: BooksEntity, idx: number) => {
      let jsonBookName = formatBookName(book.name);
  
      if (jsonBookName === bookName){
        bookIndex = idx;
        originalBookName = book.name
        console.log('>> livro: ' + bookName);
        console.log('>> book.name: ' + jsonBookName);
        console.log('>> idx: ' + idx);
      }
    });
    
    if (typeof bookIndex !== 'undefined') {
      const bookInfo = {'title': originalBookName, 'chapters': books[bookIndex].chapters.length}
      res.status(200).json(bookInfo);
    }
    else {
      res.status(502).json({message: `Não existe nenhum livro com o nome ${rawBookName}`})
    }
  }
}
