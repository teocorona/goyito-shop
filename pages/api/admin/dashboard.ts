import { db } from '@database';
import type { NextApiRequest, NextApiResponse } from 'next'
import { User, Order, Product } from '@models';

type Data = {
  numberOfOrders: number;
  paidOrders: number;
  notPaidOrders: number;
  numberOfClients: number;
  numberOfProducts: number;
  productsWithNoInventory: number;
  productsWithLowInventory: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  return await getData(req, res)
}

const getData = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect()
  // const numberOfClients = await User.find({ role: 'client' }).count()
  // const numberOfOrders = await Order.count()
  // const paidOrders = await Order.find({ isPaid: true }).count()
  // const numberOfProducts = await Product.count()
  // const productsWithNoInventory = await Product.find({ inStock: 0 }).count()
  // const productsWithLowInventory = await Product.find({ inStock: { $lte: 10 } }).count()

  const [
    numberOfClients,
    numberOfOrders,
    paidOrders,
    numberOfProducts,
    productsWithNoInventory,
    productsWithLowInventory,
  ] = await Promise.all([
    User.find({ role: 'client' }).count(),
    Order.count(),
    Order.find({ isPaid: true }).count(),
    Product.count(),
    Product.find({ inStock: 0 }).count(),
    Product.find({ inStock: { $lte: 10, $gt: 0}  }).count(),
  ])

  await db.disconnect()
  res.status(200).json({
    numberOfOrders,
    paidOrders,
    notPaidOrders: numberOfOrders - paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    productsWithLowInventory,
  })
}

