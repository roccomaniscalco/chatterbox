import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  // withAuth middleware requires jwt as the session strategy
  session: { strategy: "jwt" },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  //   callbacks: {
  //     jwt: async (token, user) => {
  //       if (user) {
  //         token.uid = user.id;
  //       }
  //       return Promise.resolve(token);
  //     },
  //     session: async (session, user) => {
  //       session.user.uid = user.uid;
  //       return Promise.resolve(session);
  //     },
  //   },
});
