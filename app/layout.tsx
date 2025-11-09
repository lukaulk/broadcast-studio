import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/src/styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Broadcast Studio | Open Source Network Simulator",
  icons: {
    icon: "/favicon.ico",
  },
  authors: {
    name: "Lukau NDOMBELE",
    url: "https://lukau.vercel.app/",
  },
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
          <Toaster gap={4} position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
