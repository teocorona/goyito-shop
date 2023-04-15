import { db } from '@database'
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@models'
import bcrypt from "bcryptjs";
import { jwt } from '@utils';


type Data =
  | { message: string }
  | {
    token: string;
    user: {
      email: string;
      name: string;
      role: string;
    }
  }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return checkJWT(req, res)

    default:
      return res.status(400).json({
        message: 'Bad request'
      })
  }
}

const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { token = '' } = req.cookies
  let userId = ''
  try {
    userId = await jwt.isValidToken(token)
  } catch (error) {
    return res.status(401).json({
      message: 'Unauthoized 401'
    })
  }
  await db.connect()
  const user = await User.findById(userId).lean()
  await db.disconnect()

  if (!user) {
    return res.status(404).json({
      message: 'No existe usuario'
    })
  }

  const { role, name, _id, email } = user
  const newToken = jwt.signToken(_id, email)

  return res.status(200).json({
    token: newToken,
    user: {
      email, role, name
    }
  })
}
