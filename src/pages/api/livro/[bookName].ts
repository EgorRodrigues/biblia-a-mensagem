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

function removeDiacritics(char: any) {
  return char.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).json({message: 'Desculpe, só aceitamos solicitações GET '});
  } else {
    const rawBookName = req.query.bookName
    const bookName = removeDiacritics(rawBookName).toLowerCase().replace(" ", "");
    const books = BibleData['books'];
    let bookIndex : undefined | number;
  
    books.forEach((book: BooksEntity, idx: number) => {
      let jsonBookName = removeDiacritics((book.name)).toLowerCase().replace(" ", "");
  
      if (jsonBookName === bookName){
        bookIndex = idx;
        console.log('>> livro: ' + bookName);
        console.log('>> book.name: ' + jsonBookName);
        console.log('>> idx: ' + idx);
      }
    });
    
    if (typeof bookIndex !== 'undefined') {
      res.status(200).json(books[bookIndex]);
    }
    else {
      res.status(502).json({message: `Não existe nenhum livro com o nome ${rawBookName}`})
    }
  }
}
