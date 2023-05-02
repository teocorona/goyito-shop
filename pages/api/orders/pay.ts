import { db } from '@database'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Order } from '@models'
import { PaypalStatusResponse } from '@types'

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

const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET
  const body = new URLSearchParams('grant_type=client_credentials')
  const base64Token = Buffer.from(`${PAYPAL_CLIENT}:${PAYPAL_SECRET}`, 'utf-8').toString('base64')
  try {
    const { data } = await axios.post(process.env.PAYPAL_OAUTH_URL || '', body, {
      headers: {
        'Authorization': `Basic ${base64Token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
    return data.access_token
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data)
    } else {
      console.log(error)
    }
    return null
  }

}

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const paypalBearerToken = await getPaypalBearerToken()
  if (!paypalBearerToken) {
    return res.status(400).json({ message: 'No paypal token' })
  }

  const { transactionId = '', orderId = '' } = req.body
  const { data } = await axios.get<PaypalStatusResponse>(`${process.env.PAYPAL_ORDERS_URL}/${transactionId}` || '', {
    headers:{
      'Authorization': `Bearer ${paypalBearerToken}`
    }
  })

  if(data.status !== 'COMPLETED'){
    return res.status(401).json({ message: 'No order match' })
  }

  await db.connect()
  const dbOrder = await Order.findById(orderId)
  if(!dbOrder){
    await db.disconnect()
    return res.status(401).json({ message: 'No order found' })
  }
  if(dbOrder.total !== Number(data.purchase_units[0].amount.value)){
    await db.disconnect()
    return res.status(401).json({ message: 'Totals dont match' })
  }
  dbOrder.transactionId = transactionId
  dbOrder.isPaid = true
  // TODO: aqui se puede mandar un correo de confirmacion al cliente
  // TODO: o dar acceso al producto digital
  await dbOrder.save()
  await db.disconnect()


  return res.status(200).json({ message: 'Paid Order' })
}

