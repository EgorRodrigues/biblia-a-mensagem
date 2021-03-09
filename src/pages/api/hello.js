// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import BibleData from '../../../the-message-the-bible-ptbr.json'

export default (req, res) => {
  // res.status(200).json({ name: 'John Doe' })
  res.status(200).json(BibleData)
}
