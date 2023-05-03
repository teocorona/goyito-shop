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
  // const a = req.nextUrl.pathname.startsWith('/api')
  // return new Response(JSON.stringify({ message: {a} }), {
  //   status: 401,
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // })

  const session: any = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET })
  const path = req.nextUrl.pathname

  if (!session) {
    return NextResponse.redirect(
      new URL(`/auth/login?p=${path}`, req.url)
    )
  }
  const role = session.user.role

  const validRoles = ['admin']
  if (path.startsWith('/api')) {
    if (!validRoles.includes(role)) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  }

  if (path.startsWith('/admin')) {
    if (!validRoles.includes(role)) {
      return NextResponse.redirect(
        new URL('/', req.url)
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/checkout/:path*',
    '/admin/:path*',
    '/api/admin/:path*',
  ],
}
