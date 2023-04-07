import { db } from '@database'
import type { NextApiRequest, NextApiResponse } from 'next'
import Product from '@models'
import { ProductType } from '@types'

type Data =
  | { message: string }
  | ProductType[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'GET':
      return searchProducts(req, res)

    default:
      return res.status(400).json({
        message: 'Bad request'
      })
  }
}

const searchProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  let { q = '' } = req.query
  if (q.length === 0) {
    return res.status(400).json({
      message: 'Empty search'
    })
  }
  q = q.toString().toLowerCase()
  await db.connect()
  const products = await Product.find({
    $text: { $search: q }
  })
    .select('title images price inStock slug -_id')
    .lean()
  await db.disconnect()
  if (!products) {
    return res.status(404).json({
      message: 'Not found'
    })
  }
  res.status(200).json(products)
}
