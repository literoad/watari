import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { session } from "../../../lib/auth-callbacks";
import { onCreateUser } from "../../../lib/auth-events";
import clientPromise from "../../../lib/mongodb";

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  pages: {
    signIn: "/auth/sign-up",
    verifyRequest: "/auth/email-sent",
  },
  theme: {
    colorScheme: "dark",
    brandColor: "#5bbfac",
    logo: "/images/logo_transparent.png",
  },
  events: {
    createUser: onCreateUser,
  },
  callbacks: {
    session,
  },
});
