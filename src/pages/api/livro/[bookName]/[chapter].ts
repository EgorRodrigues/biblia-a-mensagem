// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import BibleData from '../../../../../public/assets/the-message-the-bible-ptbr.json'

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

const isValid = (chapter: number, bookData: BooksEntity) => {
  const bookLength = bookData.chapters.length
  return (chapter > 0 && chapter < bookLength + 1) ? true : false;
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).json({message: 'Desculpe, só aceitamos solicitações GET'});
  } else {
    const rawBookName = req.query.bookName
    const chapter = Number(req.query.chapter)
    const bookName = removeDiacritics(rawBookName).toLowerCase().replace(" ", "");
    const books = BibleData['books'];
    let bookIndex : undefined | number;
    let headerBookName: string
  
    books.forEach((book: BooksEntity, idx: number) => {
      let jsonBookName = removeDiacritics((book.name)).toLowerCase().replace(" ", "");
  
      if (jsonBookName === bookName){
        bookIndex = idx;
        headerBookName = book.name;

        console.log('>> livro: ' + bookName);
        console.log('>> book.name: ' + jsonBookName);
        console.log('>> idx: ' + idx);
        console.log('>> number: ' + chapter);
      }
    });
    
    if (typeof bookIndex !== 'undefined') {
      const bookData = books[bookIndex];
      
      if (isValid(chapter, bookData)) {
        const chapterData = books[bookIndex].chapters[chapter - 1];
        const headerObject = {'name': headerBookName};
        const mergedJson = Object.assign({}, headerObject, chapterData);

        res.status(200).json(mergedJson);
      } else {
        res.status(502).json({message: `O capítulo ${chapter} não existe`})
      }
    } else {
      res.status(502).json({message: `Não existe nenhum livro com o nome ${rawBookName}`})
    }
  }
}