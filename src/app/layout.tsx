import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import { getServerSession } from "next-auth";
import { authConfig } from "./api/auth/[...nextauth]/config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Subscribo - Subscription Manager",
  description: "Track all your subscriptions in one place",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authConfig);

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider session={session}>{children}</AuthProvider>
      </body>
    </html>
  );
} 