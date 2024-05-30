import nextAuth, { NextAuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import { userSchema } from "@/packages/types";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
        type: "credentials",
        name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {email:string, password: string};

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: email,
            },
          });

          if (!user) {
            throw new Error("User not found");
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            throw new Error("Password incorrect");
          }

          return user;
        } catch (err) {
          console.error("Error during login:", err);
          throw new Error("Login failed");
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login"
  },
};

const handler = nextAuth(authOptions);

export { handler as GET, handler as POST };
