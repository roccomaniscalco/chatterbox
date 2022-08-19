import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import { getPrisma } from "./prisma";

export const getAuthOptions = () => {
  prisma = getPrisma();

  return {
    adapter: PrismaAdapter(prisma),
    // withAuth middleware requires jwt as the session strategy
    session: { strategy: "jwt" },
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
    ],
    callbacks: {
      session: async ({ session, token }) => {
        if (session?.user) {
          session.user.id = token.uid;
        }
        return session;
      },
      jwt: async ({ user, token }) => {
        if (user) {
          token.uid = user.id;
        }
        return token;
      },
    },
  };
};
