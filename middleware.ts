import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// import { jwt } from '@utils'
// import * as jose from "jose";
import { getToken } from 'next-auth/jwt'


export async function middleware(req: NextRequest) {
  // const token = request.cookies.get('token')?.value ?? ''
  // try {
  // await jwt.isValidToken(token)
  // await jose.jwtVerify(
  //   token,
  //   new TextEncoder().encode(process.env.JWT_SECRET_SEED)
  // );
  //   return NextResponse.next()
  // } catch (error) {
  //   return NextResponse.redirect(
  //     new URL(`/auth/login?p=${request.nextUrl.pathname}`, request.url)
  //   )
  // }
  const session = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET })
  if (!session) {
    return NextResponse.redirect(
      new URL(`/auth/login?p=${req.nextUrl.pathname}`, req.url)
    )
  }
  return NextResponse.next()
}

  export const config = {
    matcher: ['/checkout/:path*'],
  }