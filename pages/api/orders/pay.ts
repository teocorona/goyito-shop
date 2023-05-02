import type { NextApiRequest, NextApiResponse } from 'next'

type Data =
  | { message: string }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return payOrder(req, res)

    default:
      res.status(400).json({ message: 'Bad Request' })
  }
}

function payOrder(req: NextApiRequest, res: NextApiResponse<Data>) {



  res.status(200).json({ message: 'todo bien' })
}

