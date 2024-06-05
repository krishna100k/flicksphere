import nextAuth, { Awaitable, ISODateString, NextAuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { Profile } from "next-auth";
import DBClient from '@/lib/prisma'


const prisma = DBClient.getInstance().prisma


interface GoogleProfile extends Profile {
  sub: string;
  email: string;
  name: string;
  picture: string; 
}


export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma),
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

          const passwordMatch = await bcrypt.compare(password, user.password as string);


          if (!passwordMatch) {
            throw new Error("Password incorrect");
          }

          return user;
        } catch (err:any) {
          console.error(err);
          throw new Error(err);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ],
  session: { strategy : "jwt"},
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login"
  },
  callbacks: {
    async signIn({account, profile}){
      const googleProfile = profile as GoogleProfile;
      if(account?.provider === "google"){
        try{
          const user = await prisma?.user?.findUnique({
            where:{
              email: googleProfile?.email
            }
          });


          if(user && !user?.image){
            await prisma.user.update({
              where:{
                id: user?.id
              },
              data:{
                image: googleProfile?.picture
              }
            })
          }

          if(!user){
             await prisma.user.create({
              data:{
                id: googleProfile?.sub,
                name: googleProfile?.name as string,
                email: googleProfile?.email as string,
                image: googleProfile?.picture
              }
            })
            return true
          }else{
            return true;
            
          }
        }catch(err){
          console.log("Error Signing In", err);
          return false;

        }
      }

      return true;

    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session}  ) {

      const data = await prisma.user.findUnique({
        where:{
          email: session?.user?.email || ""
        },
        select:{
          id:true,
          name : true
        }
      })

      if (session && session.user) {
        session.user.id = data?.id || "";
        session.user.name = data?.name || ""
      }
      return session;
    },
  }
};