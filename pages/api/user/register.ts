import { db } from '@database'
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@models'
import bcrypt from "bcryptjs";
import { jwt, validations } from '@utils';

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
    case 'POST':
      return registerUser(req, res)

    default:
      return res.status(400).json({
        message: 'Bad request'
      })
  }
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email = '', password = '', name = '' } = req.body

  if (password.length < 6) {
    return res.status(400).json({
      message: 'La contraseña debe ser de al menos 6 caracteres'
    })
  }
  if (name.length < 3) {
    return res.status(400).json({
      message: 'El nombre debe ser de al menos 3 caracteres'
    })
  }
  if (!validations.isValidEmail(email)) {
    return res.status(400).json({
      message: 'No es un email válido'
    })
  }

  await db.connect()
  const user = await User.findOne({ email })
  if (user) {
    return res.status(404).json({
      message: 'Error - Correo ya registrado'
    })
  }

  const newUser = new User({
    email: email.toLocaleLowerCase(),
    password: bcrypt.hashSync(password),
    role: 'client',
    name,
  })

  try {
    await newUser.save({ validateBeforeSave: true })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Error del servidor, revisar logs del servidor'
    })
  }
  await db.disconnect()

  const { _id, role } = newUser

  const token = jwt.signToken(_id, email)

  return res.status(200).json({
    token,
    user: {
      email, role, name
    }
  })
}
