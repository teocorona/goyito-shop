import jwt from 'jsonwebtoken'

export const signToken = (_id: string, email: string) => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error('no jwt seed, check env variables')
  }
  return jwt.sign(
    { _id, email },
    process.env.JWT_SECRET_SEED,
    { expiresIn: '30d' }
  )
}

export const isValidToken = (token: string,): Promise<string> => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error('no jwt seed, check env variables')
  }
  return new Promise((res, rej) => {
    try {
      jwt.verify(
        token,
        process.env.JWT_SECRET_SEED || '',
        (err, payload) => {
          if (err) return rej('not valid JWT')
          const { _id } = payload as { _id: string }
          res(_id)
        }
      )
    } catch (error) {
      rej('not valid JWT')
    }
  })
}