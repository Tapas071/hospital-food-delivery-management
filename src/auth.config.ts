import { Session } from "inspector/promises";
import { NextAuthConfig } from "next-auth";

export const authConfig = {
  session: {
    strategy: "jwt",
  },
  providers: [],
} satisfies NextAuthConfig;
