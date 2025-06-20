import { type Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { db } from "@/server/db";
import { comparePassword } from "@/lib/utils-shared";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 12,
  },
  jwt: {
    maxAge: 60 * 60 * 12,
  },
  pages: {
    signIn: "/sign-in",
    newUser: "/sign-up",
    error: "/error",
  },
  callbacks: {
    session: ({ session, token }) => {
      if (session?.user && token) {
        session.user.id = token.uid as string;
      }

      return session;
    },
    jwt: ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }

      return token;
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        username: {
          label: "username",
          type: "text",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          return null;
        }
        const user = await db.user.findUnique({
          where: {
            username: credentials.username,
          },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await comparePassword(
          credentials.password,
          user.password,
        );
        if (!isPasswordValid) {
          return null;
        }
        return {
          id: user.id,
          name: user.username,
          email: user.email,
        };
      },
    }),
  ],
};
/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
