import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { Prisma } from "../src/generated/prisma/client";

export const auth = betterAuth({
  database: prismaAdapter(Prisma, {
    provider: "postgresql", // ou "mysql", "sqlite" conforme seu DB
  }),
  
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // mude para true em produção
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
  
  // URL base da sua aplicação
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  
  // Configurações de sessão
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 dias
    updateAge: 60 * 60 * 24, // atualiza a cada 24h
  },
  
  // Configurações avançadas (opcional)
  advanced: {
    cookiePrefix: "better-auth",
    crossSubDomainCookies: {
      enabled: false,
    },
  },
});