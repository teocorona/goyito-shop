import NextAuth from "next-auth"
import { roleType } from "./user";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
  interface User {
    id?: string;
    // _id: string;
    // email: string;
    // role: roleType;
    // name: string;
  }

}