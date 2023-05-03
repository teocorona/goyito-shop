import { db } from '@database'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Order } from '../../../models/Order'
import { OrderType } from '../../../types/order'

type Data =
  | { message: string }
  | OrderType[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getOrders(req, res)
    default:
      return res.status(400).json({ message: 'Bad request' })
  }
}

const getOrders = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const orders = await Order.find()
    .populate('user', 'name email')
    .sort({ createdAt: 'desc' })
    .lean()
  await db.disconnect();
  return res.status(200).json(orders)
}
