import NextAuth, { NextAuthOptions } from 'next-auth'
import AppleProvider from 'next-auth/providers/apple'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import GithubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { checkUserEmailPassword, oAuthToDbUser } from '@database'

export const authOptions: NextAuthOptions = {
  providers: [
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET
    // }),
    Credentials({
      name: 'Email',
      credentials: {
        email: { label: 'Correo:', type: 'email', placeholder: 'ejemplo@email.com' },
        password: { label: 'Contraseña:', type: 'password', placeholder: 'constraseña' },
      },
      async authorize(credentials) {
        // console.log(credentials)
        // return { name: 'teo', correo: 'teo@teo.com', role: 'admin' }
        return await checkUserEmailPassword(credentials!.email, credentials!.password)
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || ''
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: 'NextAuth.js <no-reply@example.com>'
    // }),
  ],
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },
  session: {
    maxAge: 2592000,
    strategy: 'jwt',
    updateAge: 86400,
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token
        switch (account.type) {
          case 'credentials':
            token.user = user
            break;
          case 'oauth':
            token.user = await oAuthToDbUser(user.email || '', user.name || '')
            break;
        }
      }
      // console.log({ token, account, user })
      return token
    },
    async session({ session, token }) {
      // console.log({ session, token})
      session.accessToken = token.accessToken as any;
      session.user = token.user as any;
      return session
    }
  }
}

export default NextAuth(authOptions)

