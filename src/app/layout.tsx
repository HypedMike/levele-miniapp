import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Don Bosco",
  description: "Toolkit per la parrocchia di San Donato",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js" async/>
      </head>
      <body className={inter.className} style={{
          marginTop: "90px"
      }}>{children}</body>
      </html>
  );
}