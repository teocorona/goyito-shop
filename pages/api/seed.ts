import type { NextApiRequest, NextApiResponse } from 'next'
import { db, initialData } from '@database'
import { Product, User } from '@models'

type Data = {
  msg: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (process.env.NODE_ENV === 'production') {
    return res.status(401).json({ msg: 'Unauthorized production goyito' })
  }
  await db.connect()
  await Product.deleteMany();
  await Product.insertMany(initialData.products)
  await User.deleteMany();
  await User.insertMany(initialData.users)
  await db.disconnect()
  res.status(200).json({ msg: 'Proceso realizado correctamente' })
  res.status(200).json({ msg: 'commented' })
}
