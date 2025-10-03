import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/src/styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Broadcast Studio - Emulador de Redes",
  description:
    "Crie e emule redes de computadores com precisão. Uma alternativa poderosa e de código aberto para Cisco Packet Tracer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}>
      
        {children}
        <Analytics />
        <Toaster gap={4} theme="dark" position="top-center" />
      </body>
    </html>
  );
}
