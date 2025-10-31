import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { Prisma } from "../src/generated/prisma/client";

export const auth = betterAuth({
  database: prismaAdapter(Prisma, {
    provider: "mysql", 
  }),
  
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, 
  },
  
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  
  secret: process.env.BETTER_AUTH_SECRET!,
  
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  
  advanced: {
    cookiePrefix: "better-auth",
    crossSubDomainCookies: {
      enabled: false,
    },
  },
});