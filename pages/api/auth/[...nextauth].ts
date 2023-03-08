import clientPromise from "@/lib/api/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
    signOut: "/",
  },
  adapter: MongoDBAdapter(clientPromise, { databaseName: "Production" }),
  callbacks: {
    async session({ user, session }: any) {
      session.user.id = user.id;
      return session;
    },
  },
  session: {
    maxAge: 2 * 24 * 60 * 60,
  },
};

export default NextAuth(authOptions);
