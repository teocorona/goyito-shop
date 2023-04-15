import { db } from '@database'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Product } from '@models'
import { ProductType } from '@types'

type Data =
  | { message: string }
  | ProductType

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'GET':
      return getProduct(req, res)

    default:
      return res.status(400).json({
        message: 'Bad request'
      })
  }
}

const getProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { slug } = req.query
  await db.connect()
  const product = await Product.findOne({ slug }).lean()
  await db.disconnect()
  if (!product) {
    return res.status(404).json({
      message: 'Not found'
    })
  }
  res.status(200).json(product)
}
