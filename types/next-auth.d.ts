import NextAuth from "next-auth";
import { User } from "./typings";

declare module "next-auth" {
  interface Session {
    user: User;
  }
}
