
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {authConfig} from "./auth.config";
import { loginUser } from "./lib/actions/auth.action";

interface IUserLoginCredentials {
  email: string;
  password: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Credentials are missing.");
        }

        const parsedCredentials: IUserLoginCredentials = {
          email: (credentials as IUserLoginCredentials).email,
          password: (credentials as IUserLoginCredentials).password,
        };
        const user2Res = await loginUser(parsedCredentials);
        if (user2Res) {
          if (user2Res.statusCode === 401) {
            return null;
          }
          return user2Res.user;
        }
        return null;
      },
    }),
  ],
});