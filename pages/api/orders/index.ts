import { db } from '@database'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { Product, Order } from '@models'
import { OrderType } from '@types'
import { authOptions } from '../auth/[...nextauth]'

type Data = 
| {  message: string}
| OrderType

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'POST':
      return createOrder(req, res)

    default:
      return res.status(400).json({ message: 'Bad request' })
  }
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { orderItems, total } = req.body as OrderType

  const session: any = await getServerSession(req, res, authOptions)
  if (!session) {
    return res.status(401).json({ message: 'No user' })
  }
  const productsIds = orderItems.map(product => product._id)
  await db.connect();
  const dbProducts = await Product.find({ _id: { $in: productsIds } });
  try {
    const subTotal = orderItems.reduce((prev, curr) => {
      const currPrice = dbProducts.find(prod => prod.id === curr._id)?.price
      if(!currPrice){
        throw new Error(`Error en el producto ${curr._id}`);
      }
      return (curr.quantity * currPrice) + prev
    }, 0)
    const taxIva = subTotal * Number(process.env.NEXT_PUBLIC_TAX_IVA || 0);
    const taxIeps = subTotal * Number(process.env.NEXT_PUBLIC_TAX_IEPS || 0);
    const backendTotal = subTotal + taxIva + taxIeps;
    if (total !== backendTotal){
      throw new Error(`Error en el total`);
    }
    const userId = session.user._id
    console.log({...req.body, isPaid: false, user: userId})
    const newOrder = new Order({...req.body, isPaid: false, user: userId})
    await newOrder.save()
    await db.disconnect();
    return res.status(201).json(newOrder)
  } catch (error: any) {
    await db.disconnect();
    console.log(error)
    return res.status(400).json({ message: error.message || 'Cart validations errors' })
  }


    return res.status(201).json(session)
}