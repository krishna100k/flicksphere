import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionsProvider from "./SessionProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlickSphere",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" lang="en">
      <SessionsProvider >
      <body className={inter.className}>{children}</body>
      </SessionsProvider>
    </html>
  );
}
