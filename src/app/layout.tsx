import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { HeroSection } from "@/components/HeroSection";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GuruNimbus",
  description: "Building RAG powered AI Chatbot to rate my professor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </ClerkProvider>
  );
}
