// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import NewTestamentBibleBooks from '../../../../the-message-the-bible-new-testament-books.json'

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(500).json({message: 'Desculpe, só aceitamos solicitações GET '});
  } else {
    res.status(200).json(NewTestamentBibleBooks)
  }
}