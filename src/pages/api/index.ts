// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  // console.log(req.body) // The request body
  // console.log(req.query) // The url query string
  // console.log(req.cookies) // The passed cookies
  res.status(200);
  res.send('<h1>Teste</h1>')
}