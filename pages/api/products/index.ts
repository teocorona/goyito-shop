import { db, CONSTANTS } from '@database'
import type { NextApiRequest, NextApiResponse } from 'next'
import Product from '@models'
import { ProductType } from '@types'

type Data = {
  message: string
  products?: ProductType[]
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res)

    default:
      return res.status(400).json({
        message: 'Bad request'
      })
  }

}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { category = ' all' } = req.query
  let condition = {};
  if (category !== 'all' && CONSTANTS.validCategory.includes(`${category}`) ) {
    condition = { category }
  }
  await db.connect()
  const products = await Product.find(condition)
    .select('title images price inStock slug -_id')
    .lean()
  await db.disconnect()
  res.status(200).json({
    message: 'all products',
    products
  })
}